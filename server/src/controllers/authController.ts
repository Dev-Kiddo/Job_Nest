import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel.js";
import { loginHandlerValidation, registerHandlerValidation } from "../validators/authValidations.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/tokenUtils.js";

export const registerHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = registerHandlerValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("All the input fields required", 403));

    // return res.status(403).json({
    //   success: false,
    //   message: "Fail: All the fields required",
    // });
  }

  const { name, email, password } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await UserModel.findOne({ email: normalizedEmail });

  if (existingUser) {
    return next(new AppError("Email already registered, Please login", 400));
  }

  // const hashPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    name,
    email,
    password,
  });

  // const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_ACCESS_KEY!, { expiresIn: "15m" });

  const accessTokenPayload = { id: user._id, email: user.email, role: user.role };

  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload = { id: user._id };

  // const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_KEY!, { expiresIn: "2d" });

  const refreshToken = generateRefreshToken(refreshTokenPayload);

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  await user.save();

  res.status(200).json({
    success: true,
    message: "User registerd successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      isActive: user.isActive,
    },
  });
});

export const loginHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = loginHandlerValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("All the input fields required", 403));
  }

  const { email, password } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const isUser = await UserModel.findOne({ email: normalizedEmail }).select("+password");

  if (!isUser) {
    return next(new AppError("User not found, Please register first", 404));
  }

  // Type assertion to ensure TypeScript recognizes comparePassword
  // const isMatch = await (isUser as any).comparePassword(password);
  const isMatch = await isUser.comparePassword(password);

  if (!isMatch) {
    return next(new AppError("Invalid Credentials", 400));
  }

  const accessTokenPayload = { id: isUser._id, email: isUser.email, role: isUser.role };
  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload = { id: isUser._id };
  const refreshToken = generateRefreshToken(refreshTokenPayload);

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: isUser._id,
      name: isUser.name,
      email: isUser.email,
      role: isUser.role,
      skills: isUser.skills,
      isActive: isUser.isActive,
    },
  });
});

export const logoutHandler = asyncHandler(async function (req: Request, res: Response, next) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logout successfull",
  });
});

export const refreshAccessTokenHandler = asyncHandler(async function (req: Request, res: Response, next) {
  const token = req.cookies.refreshToken;

  // console.log("REFRESHTOKEN", token);

  if (!token) {
    return next(new AppError("No authorization token was found", 401));
  }

  const verifyToken = verifyRefreshToken(token) as jwt.JwtPayload;
  // console.log(verifyToken);

  if (!verifyToken) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  const user = await UserModel.findById({ _id: verifyToken.id });
  // console.log("user", user);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const accessTokenPayload = { id: user._id, email: user.email, role: user.role };

  const accessToken = generateAccessToken(accessTokenPayload);

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.status(200).json({
    success: true,
    message: "Access token generated successfully",
  });
});
