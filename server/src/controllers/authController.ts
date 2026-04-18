import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel.js";
import { forgotPasswordValidation, loginHandlerValidation, registerHandlerValidation, resetPasswordValidation, updatePasswordValidation } from "../validators/authValidations.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshToken, generateAccessToken, generateRandomToken, generateRefreshToken, hashToken, verifyRefreshToken } from "../utils/tokenUtils.js";
import type { AccessTokenPayload } from "../types/tokenTypes.js";
import type { RefreshTokenPayload } from "../types/tokenTypes.js";
import CandidateModel from "../models/candidateModel.js";

import CompanyModel from "../models/companyModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import SessionModel from "../models/sessionModel.js";
import { formatSessions, generateSessionToken, getClientIP, getDeviceInfo, getLocationFromIp } from "../utils/sessionHelperHandler.js";

export const registerHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = registerHandlerValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("All the input fields required", 403));
  }

  const { name, email, password, confirmPassword, role } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await UserModel.findOne({ email: normalizedEmail });

  if (existingUser) {
    return next(new AppError("Email already registered, Please login", 409));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Password doesn't match", 400));
  }

  const token = generateRandomToken();
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

  if (user.role === "candidate") {
    await CandidateModel.create({
      user: user._id,
    });
  }

  if (user.role === "recruiter") {
    user.needaCompanySetup = user.role === "recruiter";
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
      needaCompanySetup: user.role === "recruiter",
    },
  });
});

export const loginHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  console.log(req.headers["user-agent"]);

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

  if (!isUser.isActive) {
    return next(new AppError("Your account is disabled", 404));
  }

  // Generate session
  const sessionToken = generateSessionToken();

  const ipAddress = getClientIP(req);

  const userAgent = req.headers["user-agent"];

  // Get location From IP
  const location = getLocationFromIp(ipAddress);

  // deviceInfo
  const deviceInfo = getDeviceInfo(userAgent);

  await SessionModel.create({
    userId: isUser._id,
    sessionId: sessionToken,
    deviceInfo,
    ipAddress,
    location,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  if (isUser.role === "recruiter" && isUser.needaCompanySetup) {
    generateAccessAndRefreshToken(isUser, sessionToken, res);

    return res.status(200).json({
      success: true,
      message: "Before login, you need to set up your company profile",
      redirectUrl: `${process.env.CLIENT_URL}/setup-company`,
    });
  }

  const isMatch = await isUser.comparePassword(password);

  if (!isMatch) {
    return next(new AppError("Invalid Credentials", 400));
  }

  generateAccessAndRefreshToken(isUser, sessionToken, res);

  // const accessTokenPayload = { id: isUser._id, email: isUser.email, role: isUser.role, sessionId: sessionToken };

  // const accessToken = generateAccessToken(accessTokenPayload);

  // const refreshTokenPayload = { id: isUser._id };
  // const refreshToken = generateRefreshToken(refreshTokenPayload);

  // res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  // res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  return res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

export const logoutHandler = asyncHandler(async function (req: Request, res: Response, next) {
  // console.log(req.connection.remoteAddress);
  // console.log(req.socket.remoteAddress);
  // console.log(req.ip);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

export const verifyEmailHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  console.log("hhee");

  const { token } = req.query;

  if (!token) {
    return next(new AppError("No authorization token was found", 401));
  }

  const verifyToken = hashToken(token as string);

  const user = await UserModel.findOne({ emailVerificationToken: verifyToken });

  if (!user) {
    return next(new AppError("Oops, User not found!", 404));
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

  // console.log(userDetail);

  if (!userDetail) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  const user = await UserModel.findOne({ _id: userDetail.id }).select("name email role avatar phone location authProvider googleId isEmailVerified lastLogin");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
  });
});

export const forgotPasswordHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = forgotPasswordValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("Email is required to process", 400));
  }

  const { email } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const user = await UserModel.findOne({ email: normalizedEmail });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const token = generateRandomToken();

  const hashTokenDB = hashToken(token);

  const forgotPasswordUrl = `http://localhost:5173/reset-password?token=${token}`;

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
  Forgot your password?
  </h1>
  </td>
  </tr>
  
  <tr>
  <td style="padding-bottom:25px;">
  <p style="margin:0; font-size:14px; color:#777777; line-height:1.6;">
  Hi there, <br/>
  
  No worries — it happens! 😊 <br />
  Click the link below to reset your password:
  </p>
  </td>
  </tr>
  
  <tr>
  <td style="padding-bottom:25px;">
  <a href="${forgotPasswordUrl}" 
  style="display:inline-block; padding:14px 25px; background-color:#2563EB; color:#ffffff; text-decoration:none; font-size:16px; border-radius:4px;">
  Reset Password
  </a>
  </td>
  </tr>
  
  <tr>
  <td style="padding-bottom:20px;">
  <p style="margin:0; font-size:12px; color:#999999;">
  Or paste this link into your browser:
  </p>
  <p style="margin:5px 0 0 0; font-size:12px;">
  <a href="${forgotPasswordUrl}" style="color:#3498db; text-decoration:none;">
  ${forgotPasswordUrl}
  </a>
  </p>
  </td>
  </tr>
  
  <tr>
  <td style="padding-bottom:20px;">
  <p style="margin:0; font-size:12px; color:#999999;">
  This link is valid for a limited time.
  </p>
  <p style="margin:5px 0 0 0; font-size:12px;">
  If you didn’t request this, you can safely ignore this email.
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

  sendEmail(user.email, "Forgot Password", emailContent);

  user.passwordResetToken = hashTokenDB;
  user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Reset Password Link Sent Your Email",
    user: {
      id: user._id,
      email: user.email,
    },
  });
});

export const resetPasswordhandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { token } = req.query;

  console.log("TOK", token);

  if (!token) {
    return next(new AppError("No authorization token was found!", 404));
  }

  const result = resetPasswordValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("All input fields are required", 400));
  }

  const { password, confirmPassword } = result.data;

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match!", 400));
  }

  const verifyToken = hashToken(token);

  const user = await UserModel.findOne({ passwordResetToken: verifyToken });

  // console.log("RESET USER", user);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (new Date(Date.now()) > user.passwordResetExpires!) {
    return next(new AppError("Invalid or expired token!", 404));
  }

  if (user.passwordResetToken !== verifyToken) {
    return next(new AppError("Invalid or expired token!", 404));
  }

  user.password = confirmPassword;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfull",
  });
});

export const updatePasswordHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = updatePasswordValidation.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("Old or New Password required to process", 400));
  }

  const { oldPassword, newPassword, confirmPassword } = result.data;

  const normalizePassword = confirmPassword.trim();

  const user = await UserModel.findById({ _id: req.user.id }).select("+password");

  const isPasswordMatch = await user?.comparePassword(oldPassword);

  if (!isPasswordMatch) {
    return next(new AppError("Old Password doesn't match", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError("Password doesn't match", 400));
  }

  if (!user) {
    return next(new AppError("User not found!", 400));
  }

  user.password = normalizePassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

export const resendVerificationEmailHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  if (!id) {
    return next(new AppError("Access token invalid or expired!", 400));
  }

  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    return next(new AppError("User not found!", 400));
  }

  if (user?.isEmailVerified) {
    return next(new AppError("Email already verified!", 400));
  }

  user.emailVerificationExpires = null;
  user.emailVerificationToken = null;

  const verifyToken = generateRandomToken();
  const verifyTokenDB = hashToken(verifyToken);

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${verifyToken}`;

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

  sendEmail(user.email, "Email Verification", emailContent);

  user.emailVerificationToken = verifyTokenDB;
  user.emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Verify email sent successfully",
  });
});

export const getSessionsHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  console.log(req.user.id);

  const sessions = await SessionModel.find({ userId: req.user.id, isActive: true });

  const userSession = sessions.map((session) => formatSessions(session));

  console.log("USERSESSION", userSession);

  res.status(200).json({
    success: true,
    message: "Fetch login sessions successfully",
    count: userSession.length,
    sessions: userSession,
  });
});

export const revokeSessionHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id: sessionId } = req.params;

  const session = await SessionModel.findByIdAndDelete({ _id: sessionId });

  if (!session) {
    return next(new AppError("Session ID not valid", 400));
  }

  res.status(200).json({
    success: true,
    message: "Session removed successfully",
  });
});
