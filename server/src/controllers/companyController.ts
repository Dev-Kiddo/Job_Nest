import type { NextFunction, Request, Response } from "express";
import CompanyModel from "../models/companyModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const createCompanyInfoHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { logo, banner, name: companyName, description, tagline, website } = req.body;

  const name = companyName.toLowerCase();

  if (!name) {
    return next(new AppError("Company name is required to process", 404));
  }

  if (!req.user) {
    return next(new AppError("Token expired or invalid", 404));
  }

  const isUser = req.user;

  const isCompanyRegistered = await CompanyModel.findOne({ name });

  if (isCompanyRegistered) {
    return next(new AppError("This name already registered, Please continue with existing company", 404));
  }

  const user = await UserModel.findOne({ _id: isUser.id, role: "recruiter", needaCompanySetup: true });

  console.log("USER", user);

  if (!user) {
    return next(new AppError("Oops, User not found!", 404));
  }

  const company = await CompanyModel.create({ user: [req.user.id], name, description, logo, banner, tagline, website });

  user.needaCompanySetup = false;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Success",
    user,
  });
});
