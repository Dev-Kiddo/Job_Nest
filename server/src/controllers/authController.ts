import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel.js";
import { registerHandlerValidation } from "../validators/authValidations.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = registerHandlerValidation.safeParse(req.body);

  //   console.log("result", result);

  if (!result.success) {
    return next(new AppError("Fail: All the fields required", 403));

    // return res.status(403).json({
    //   success: false,
    //   message: "Fail: All the fields required",
    // });
  }

  const { name, email, password } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await UserModel.findOne({ email: normalizedEmail });

  if (existingUser) {
    return next(new AppError("Fail: Email already registered, Please login", 400));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    name,
    email,
    password: hashPassword,
  });

  console.log("USER", user);

  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_KEY!, { expiresIn: "15m" });

  // console.log("ACC", accessToken);

  const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_KEY!, { expiresIn: "2d" });

  res.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  res.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Success: User registerd successfully",
    user,
  });
});

export default registerHandler;
