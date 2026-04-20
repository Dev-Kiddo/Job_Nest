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

  // const isCompanyRegistered = await CompanyModel.findOne({ name });

  // if (isCompanyRegistered) {
  //   return next(new AppError("This name already registered, Please continue with existing company", 404));
  // }

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

  // user.needaCompanySetup = false;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Success",
    company,
  });
});

export const fetchAllCompaniesHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const company = await CompanyModel.find({});

  if (company.length === 0) {
    return next(new AppError("No companies registered yet!", 200));
  }

  res.status(200).json({
    success: true,
    message: "Fetch all companies success",
    count: company.length,
    company,
  });
});

export const fetchMyCompanyHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { user: currentUser } = req;

  const company = await CompanyModel.findOne({ user: currentUser.id });

  if (!company) {
    return next(new AppError("No company registered by this user", 200));
  }

  res.status(200).json({
    success: true,
    message: "Fetch company success",
    company,
  });
});

export const updateCompanyInfoHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { companyType, companySize, country, state, city, contactEmail, contactPhone } = req.body;

  const { id: companyId } = req.params;

  const company = await CompanyModel.findOne({ _id: companyId });

  if (!company) {
    return next(new AppError("Company not found or registered!", 400));
  }

  const isRecruiterHasCompany = company.user.some((user) => user.toString() === req.user.id);

  if (!isRecruiterHasCompany) {
    return next(new AppError("User not found as recruiter in this company", 400));
  }

  let updateData = {};

  // const allowedFields = [companyType, companySize, country, state, city, email, phone];
  // Object.keys(req.body).forEach((objKey) => {
  //   if (allowedFields.includes(objKey) && req.body[objKey] !== undefined) {
  //     updateData[objKey] = req.body[objKey];
  //   }
  // });

  if (companyType !== undefined) updateData.companyType = companyType;
  if (companySize !== undefined) updateData.companySize = companySize;
  if (country !== undefined) updateData.country = country;
  if (state !== undefined) updateData.state = state;
  if (city !== undefined) updateData.city = city;
  if (contactEmail !== undefined) updateData.contactEmail = contactEmail;
  if (contactPhone !== undefined) updateData.contactPhone = contactPhone;

  const updateCompany = await CompanyModel.findByIdAndUpdate(
    { _id: companyId },
    { companyType, companySize, locations: { country, state, city }, contactEmail, contactPhone },
    { new: true },
  );

  res.status(200).json({
    success: true,
    message: "Update Company success",
    updateCompany,
  });
});
