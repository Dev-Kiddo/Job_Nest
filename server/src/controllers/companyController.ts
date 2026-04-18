import type { NextFunction, Request, Response } from "express";
import CompanyModel from "../models/companyModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createCompanyInfoHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { name: companyName, description, tagline, website } = req.body;

  const name = companyName.toLowerCase();

  if (!name) {
    return next(new AppError("Company name is required to process", 404));
  }

  if (!req.user) {
    return next(new AppError("Token expired or invalid", 404));
  }

  const isUser = req.user;
  // console.log(isUser);

  const isCompanyRegistered = await CompanyModel.findOne({ name });

  if (isCompanyRegistered) {
    return next(new AppError("This name already registered, Please continue with existing company", 404));
  }

  const user = await UserModel.findOne({ _id: isUser.id, role: "recruiter", needaCompanySetup: true });

  if (!user) {
    return next(new AppError("Oops, User not found!", 404));
  }

  let cloudinaryLogo;
  let cloudinaryBanner;

  // console.log("ReqFiles", req.files);

  if (req.files.logo !== undefined) {
    const cloudinaryResult = await uploadToCloudinary(req.files.logo[0].buffer, "logo");

    if (!cloudinaryResult) {
      return next(new AppError("Cloudinary Logo Upload Err", 404));
    }

    cloudinaryLogo = {
      publicId: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
    };
  }

  if (req.files.banner !== undefined) {
    const cloudinaryResult = await uploadToCloudinary(req.files.banner[0].buffer, "banner");

    if (!cloudinaryResult) {
      return next(new AppError("Cloudinary Banner Upload Err", 404));
    }

    cloudinaryBanner = {
      publicId: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
    };
  }

  const company = await CompanyModel.create({ user: [req.user.id], name, description, tagline, website, logo: cloudinaryLogo, banner: cloudinaryBanner });

  user.needaCompanySetup = false;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Success",
    company,
  });
});
