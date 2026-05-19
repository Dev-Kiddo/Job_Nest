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

  const user = await UserModel.findOne({ _id: isUser.id, role: isUser.role, needaCompanySetup: true });

  // console.log("USER", user);

  if (!user) {
    return next(new AppError("Oops, User not found!", 404));
  }

  let cloudinaryLogo;
  let cloudinaryBanner;

  // console.log("ReqFiles Company Handler", req.files);

  if (req?.files?.logo !== undefined) {
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

  // if logo upload, that also need to add in users data.
  if (cloudinaryLogo) {
    user.avatar = cloudinaryLogo;
  }

  const company = await CompanyModel.create({ user: [req.user.id], name, description, tagline, website, logo: cloudinaryLogo, banner: cloudinaryBanner, registerStages: "stage1" });

  // console.log("Company:", company);

  user.needaCompanySetup = false;

  await user.save();

  return res.status(200).json({
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

  return res.status(200).json({
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

  return res.status(200).json({
    success: true,
    message: "Fetch company success",
    company,
  });
});

export const updateCompanyInfoHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  // console.log("BODY", req.body);

  const { name, description, tagline, website, companyType, companySize, location, contactEmail, contactPhone, socialLinks } = req.body;

  const { user: currentUser } = req;

  const { id: companyId } = req.params;

  const user = await UserModel.findOne({ _id: currentUser.id });
  const company = await CompanyModel.findOne({ _id: companyId });

  if (!user) {
    return next(new AppError("Oops, User not found or Token expired!", 404));
  }

  if (!company) {
    return next(new AppError("Company not found or registered!", 400));
  }

  const isRecruiterHasCompany = company.user.some((user) => user.toString() === req.user.id);

  if (!isRecruiterHasCompany) {
    return next(new AppError("User not found as recruiter in this company", 400));
  }

  let cloudinaryLogo;
  let cloudinaryBanner;
  let updateData: any = {};

  if (req?.files?.logo !== undefined) {
    const cloudinaryResult = await uploadToCloudinary(req.files.logo[0].buffer, "logo");
    // console.log("res1", cloudinaryResult);

    if (!cloudinaryResult) {
      return next(new AppError("Cloudinary Logo Update Err", 404));
    }

    cloudinaryLogo = {
      publicId: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
    };

    if (cloudinaryLogo) {
      user.avatar = cloudinaryLogo;
    }
  }

  if (req?.files?.banner !== undefined) {
    const cloudinaryResult = await uploadToCloudinary(req.files.banner[0].buffer, "banner");

    // console.log("res2", cloudinaryResult);

    if (!cloudinaryResult) {
      return next(new AppError("Cloudinary Banner Update Err", 404));
    }

    cloudinaryBanner = {
      publicId: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
    };
  }

  // console.log("CLOUD1", cloudinaryLogo);
  // console.log("CLOUD2", cloudinaryBanner);

  if (req?.files?.logo !== undefined) updateData.logo = cloudinaryLogo;
  if (req?.files?.banner !== undefined) updateData.banner = cloudinaryBanner;
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (tagline !== undefined) updateData.tagline = tagline;
  if (website !== undefined) updateData.website = website;

  if (companyType !== undefined) updateData.companyType = companyType;
  if (companySize !== undefined) updateData.companySize = companySize;
  if (location !== undefined) updateData.location = location;
  if (contactEmail !== undefined) updateData.contactEmail = contactEmail;
  if (contactPhone !== undefined) updateData.contactPhone = contactPhone;

  if (socialLinks !== undefined) updateData.socialLinks = socialLinks;

  // console.log("updatedData", updateData);

  let updateCompany = await CompanyModel.findByIdAndUpdate(
    { _id: companyId },
    {
      ...updateData,
      registerStages: updateData?.companyType && updateData?.companySize ? "stage2" : "stage1" || updateData?.socialLinks ? "finished" : "stage2",
    },
    { new: true },
  );

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Success",
    updateCompany,
  });
});
