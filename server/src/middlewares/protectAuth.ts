import SessionModel from "../models/sessionModel.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { verifyAccessToken } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";

export const protectAuth = asyncHandler(async function (req, res, next) {
  const token = req.cookies.accessToken;

  // console.log("AUTH TOKEN", token);

  if (!token) {
    return next(new AppError("No authorization token was found", 401));
  }

  const verifyToken = verifyAccessToken(token) as jwt.JwtPayload;

  if (!verifyToken) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  if (!verifyToken.sessionId) {
    return next(new AppError("No session token was found", 401));
  }

  const sessionToken = await SessionModel.findOne({ sessionId: verifyToken.sessionId, isActive: true });

  if (!sessionToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return next(new AppError("session token invalid or revoked", 401));
  }

  req.user = verifyToken;

  next();
});
