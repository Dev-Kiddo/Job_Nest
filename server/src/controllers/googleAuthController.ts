import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import UserModel from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";
import CandidateModel from "../models/candidateModel.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);

export const googleAuthHandler = function (req: Request, res: Response, next: NextFunction) {
  // console.log("URI", process.env.GOOGLE_REDIRECT_URI);

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
      existingUser.avatar.url = payload.picture ? payload.picture : null;
      existingUser.isEmailVerified = true;
    }

    const accessTokenPayload = { id: existingUser._id, email: existingUser.email, role: existingUser.role };

    const accessToken = generateAccessToken(accessTokenPayload);

    const refreshTokenPayload = { id: existingUser._id };
    const refreshToken = generateAccessToken(refreshTokenPayload);

    res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

    res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

    res.redirect(`http://localhost:5173/dashboard`);

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        isActive: existingUser.isActive,
        googleId: existingUser.googleId,
        avatar: {
          url: existingUser.avatar.url,
        },
      },
    });
  }

  const user = new UserModel({
    name: payload?.name,
    email: payload?.email,
    googleId: payload?.sub,
    avatar: {
      url: payload.picture,
    },
    role: "candidate",
    isEmailVerified: true,
    authProvider: "google",
  });

  const candidate = await CandidateModel.create({
    user: user._id,
  });

  const accessTokenPayload = { id: user._id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload = { id: user._id };
  const refreshToken = generateRefreshToken(refreshTokenPayload);

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  await user.save();
  await candidate.save();

  res.redirect("http://localhost:5173/dashboard");

  return res.status(200).json({
    success: true,
    message: "User Registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      googleId: user.googleId,
      avatar: {
        url: user.avatar.url,
      },
    },
  });
});
