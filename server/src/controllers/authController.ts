import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel.js";
import { loginHandlerValidation, registerHandlerValidation } from "../validators/authValidations.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRandomToken, generateRefreshToken, hashToken, verifyRefreshToken } from "../utils/tokenUtils.js";
import type { AccessTokenPayload } from "../types/tokenTypes.js";
import type { RefreshTokenPayload } from "../types/tokenTypes.js";
import SeekerModel from "../models/seekerModel.js";
import RecruiterModel from "../models/recruiterModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = registerHandlerValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("All the input fields required", 403));
  }

  const { name, email, password, confirmPassword, role } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await UserModel.findOne({ email: normalizedEmail });

  if (existingUser) {
    return next(new AppError("Email already registered, Please login", 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Password doesn't match", 400));
  }

  const token = generateRandomToken();

  console.log("TOKEN", token);

  const hashTokenDB = hashToken(token);

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const emailContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f2f2; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f2f2; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:6px; padding:30px; text-align:center;">
          
          <tr>
            <td style="padding-bottom:20px;">
              <h2 style="margin:0; color:#2563EB; font-weight:bold;">
                JobNest<span style="font-size:14px; vertical-align:super;">™</span>
              </h2>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:15px;">
              <h1 style="margin:0; font-size:22px; color:#333333;">
                Verify your email address
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:25px;">
              <p style="margin:0; font-size:14px; color:#777777; line-height:1.6;">
                Please confirm that you want to use this as your account email address.
                Once it's done you will be able to start using our platform!
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:25px;">
              <a href="${verifyUrl}" 
                style="display:inline-block; padding:14px 25px; background-color:#2563EB; color:#ffffff; text-decoration:none; font-size:16px; border-radius:4px;">
                Verify my email
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:20px;">
              <p style="margin:0; font-size:12px; color:#999999;">
                Or paste this link into your browser:
              </p>
              <p style="margin:5px 0 0 0; font-size:12px;">
                <a href="${verifyUrl}" style="color:#3498db; text-decoration:none;">
                  ${verifyUrl}
                </a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px; border-top:1px solid #eeeeee;">
              <p style="margin:0; font-size:12px; color:#aaaaaa;">
                © 2026 JobNest. All rights reserved.
              </p>
              <p style="margin:5px 0 0 0; font-size:12px; color:#aaaaaa;">
                Salem - India
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;

  const user = new UserModel({
    name,
    email,
    password,
    role,
    authProvider: "local",
    emailVerificationToken: hashTokenDB,
    emailVerificationExpires: new Date(Date.now() + 15 * 60 * 1000),
  });

  if (user.role === "seeker") {
    await SeekerModel.create({
      user: user._id,
    });
  }

  if (user.role === "recruiter") {
    await RecruiterModel.create({
      employer: user._id,
    });
  }

  const messageId = await sendEmail(user.email, "Email Verification", emailContent);

  if (!messageId) {
    return next(new AppError("Failed to send verification email", 400));
  }

  const accessTokenPayload: AccessTokenPayload = { id: user.id, email: user.email, role: user.role };

  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload: RefreshTokenPayload = { id: user.id };

  const refreshToken = generateRefreshToken(refreshTokenPayload);

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  user.emailVerificationToken = hashTokenDB;
  user.emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Registration success. Please verify your email before login.",
    user: {
      id: user._id,
      email: user.email,
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

  if (!isUser.isEmailVerified) {
    return next(new AppError("Please verify your email before logging in.", 404));
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

export const verifyEmailHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { token } = req.query;

  if (!token) {
    return next(new AppError("No authorization token was found", 401));
  }
  // console.log("tokenHandler", token);

  const verifyToken = hashToken(token as string);

  // console.log("verifyHandlerToken:", verifyToken);

  const user = await UserModel.findOne({ emailVerificationToken: verifyToken });

  // console.log("VERIFYHandlerUSER", user);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (new Date(Date.now()) > user.emailVerificationExpires!) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Email Verified Successfully",
  });
});

export const refreshAccessTokenHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
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

export const getCurrentUser = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const userDetail = req.user;

  console.log(userDetail);

  if (!userDetail) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  const user = await UserModel.findOne({ _id: userDetail.id });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "successfully",
    user,
  });
});
