import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import UserModel from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";
import { profile } from "node:console";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);

export const googleAuthHandler = function (req: Request, res: Response, next: NextFunction) {
  console.log("hello", process.env.GOOGLE_REDIRECT_URI);

  const authUrl = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    prompt: "consent",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
  });

  res.status(200).json({
    success: true,
    message: "Google oAuth URL generated successfully",
    authUrl,
  });
};

export const googleCallbackHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { code } = req.query;

  // console.log("CODE", code);

  if (!code || typeof code !== "string") {
    return next(new AppError("Authorization code not available", 400));
  }

  const { tokens } = await googleClient.getToken(code as string);

  // console.log("token:", tokens);

  if (!tokens || !tokens.id_token) {
    return next(new AppError("Failed to get tokens from Google", 400));
  }

  const ticket = await googleClient.verifyIdToken({ idToken: tokens.id_token as string, audience: process.env.GOOGLE_CLIENT_ID! });

  // console.log(ticket);

  const payload = ticket.getPayload();
  // console.log("payload:", payload);

  if (!payload || !payload.email) {
    return next(new AppError("Failed to get user info from Google", 400));
  }

  const existingUser = await UserModel.findOne({ email: payload?.email });

  if (existingUser) {
    if (!existingUser.googleId) {
      existingUser.googleId = payload.sub;
      existingUser.profile.avatar = payload.picture ? payload.picture : null;
      existingUser.isEmailVerified = true;

      // return res.status(302).json({
      //   success: false,
      //   message: "Linked Google account to existing user",
      // });
    }

    const accessTokenPayload = { id: existingUser._id, email: existingUser.email, role: existingUser.role };

    const accessToken = generateAccessToken(accessTokenPayload);

    const refreshTokenPayload = { id: existingUser._id };
    const refreshToken = generateAccessToken(refreshTokenPayload);

    res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

    res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        skills: existingUser.skills,
        isActive: existingUser.isActive,
        googleId: existingUser.googleId,
        profile: existingUser.profile,
      },
    });
  }

  const user = new UserModel({
    name: payload?.name,
    email: payload?.email,
    googleId: payload?.sub,
    profile: {
      avatar: payload.picture,
    },
    isEmailVerified: true,
  });

  const accessTokenPayload = { id: user._id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload = { id: user._id };
  const refreshToken = generateRefreshToken(refreshTokenPayload);

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  await user.save();

  return res.status(200).json({
    success: true,
    message: "User Registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      isActive: user.isActive,
      googleId: user.googleId,
      profile: user.profile,
    },
  });
});
