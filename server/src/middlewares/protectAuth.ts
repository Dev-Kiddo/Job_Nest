import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/tokenUtils.js";

export const protectAuth = asyncHandler(async function (req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new AppError("No authorization token was found", 401));
  }

  const verifyToken = verifyAccessToken(token) as jwt.JwtPayload;

  if (!verifyToken) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  req.user = verifyToken;

  next();
});
