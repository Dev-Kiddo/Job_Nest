import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel.js";
import { loginHandlerValidation, registerHandlerValidation } from "../validators/authValidations.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/tokenUtils.js";
import type { AccessTokenPayload } from "../types/tokenTypes.js";
import type { RefreshTokenPayload } from "../types/tokenTypes.js";
import SeekerModel from "../models/seekerModel.js";

import multer from "multer";
import sharp from "sharp";

import { v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// const multerStorage = multer.diskStorage({
//   destination: (req: Request, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const extension = file.mimetype.split("/")[1];
//     cb(null, `img-nest-${Math.round(Math.random() * 99999)}-${Date.now()}.${extension}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image, Please upload only image", 400), false);
  }
};

// const upload = multer({ dest: "public/img/users" });
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadHandler = upload.single("avatar");

export const resizeImageHandler = async function (req: Request, res: Response, next: NextFunction) {
  console.log("REQFILE", req.file);

  if (!req.file) {
    return next();
  }

  const resizedBuffer = await sharp(req.file.buffer).resize(350, 350, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();

  req.file.buffer = resizedBuffer;

  next();
};

export const registerHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  // console.log("REQ FILES", req.file);
  // console.log("REQ FILES2", req.file?.buffer);
  // console.log("REQ BODY", req.body);

  const result = registerHandlerValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("All the input fields required", 403));
  }

  const { name, email, password } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await UserModel.findOne({ email: normalizedEmail });

  console.log("EXISTING USER", existingUser);

  if (existingUser) {
    return next(new AppError("Email already registered, Please login", 400));
  }

  let cloudinaryResult;

  if (req.file) {
    cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    console.log("RESULT", cloudinaryResult);
  }

  const user = new UserModel({
    name,
    email,
    password,
    role: "seeker",
    authProvider: "local",
    avatar: {
      public_id: cloudinaryResult ? cloudinaryResult.public_id : null,
      url: cloudinaryResult ? cloudinaryResult.url : null,
    },
  });

  console.log("USER", user);

  const seeker = new SeekerModel({
    user: user._id,
  });

  const accessTokenPayload: AccessTokenPayload = { id: user.id, email: user.email, role: user.role };

  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload: RefreshTokenPayload = { id: user.id };

  const refreshToken = generateRefreshToken(refreshTokenPayload);

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  // await user.save();
  // await seeker.save();

  res.status(200).json({
    success: true,
    message: "User registerd successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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

  if (!token) {
    return next(new AppError("No authorization token was found", 401));
  }

  const verifyToken = verifyRefreshToken(token) as jwt.JwtPayload;

  if (!verifyToken) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  const user = await UserModel.findById({ _id: verifyToken.id });

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
