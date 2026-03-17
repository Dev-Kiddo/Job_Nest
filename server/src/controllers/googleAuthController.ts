import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import UserModel from "../models/userModel.js";
import { generateAccessToken } from "../utils/tokenUtils.js";

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

export const googleCallbackHandler = async function (req: Request, res: Response, next: NextFunction) {
  const { code } = req.query;

  console.log("CODE", code);

  if (!code) {
    return next(new AppError("Code is not avail", 400));
  }

  const { tokens } = await googleClient.getToken(code as string);

  console.log("token:", tokens);

  if (!tokens) {
    return next(new AppError("Code is not avail", 400));
  }

  const ticket = await googleClient.verifyIdToken({ idToken: tokens.id_token as string, audience: process.env.GOOGLE_CLIENT_ID! });

  // console.log(ticket);

  const payload = ticket.getPayload();

  console.log("payload:", payload);
  const existingUser = await UserModel.findOne({ email: payload?.email });

  if (existingUser) {
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
      },
    });
  }

  const user = new UserModel({
    name: payload?.name,
    email: payload?.email,
    googleId: payload?.sub,
  });

  const accessTokenPayload = { id: user._id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload = { id: user._id };
  const refreshToken = generateAccessToken(refreshTokenPayload);

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
    },
  });
};
