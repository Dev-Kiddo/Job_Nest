import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import CandidateModel from "../models/profileModel.js";
import AppError from "../utils/AppError.js";
import UserModel from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getMyProfileController = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  const user = await CandidateModel.findOne({ user: id }).populate("user");

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Fetch getMyProfile successfully",
    user,
  });
});

export const updateCandidateInfo = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  // console.log("req.body", req.body);

  const { fullName, location, dateOfBirth, gender, headline, skills, languages, experience, education, totalExperience, socialLinks } = req.body;

  const candidate = await CandidateModel.findOne({ user: id });

  if (!candidate) {
    return next(new AppError("Candidate profile not found!", 404));
  }

  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  const updatedata: any = {};

  if (req.files?.avatar !== undefined) {
    const cloudinaryResult = await uploadToCloudinary(req.files.avatar[0].buffer, "avatar");
    // console.log("cloudinaryResult", cloudinaryResult);
    if (!cloudinaryResult) {
      return next(new AppError("Cloudinary avatar upload err", 400));
    }

    const result = {
      publicId: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
    };

    updatedata.avatar = result;
    user.avatar = result;
  }

  if (req.files?.resume !== undefined) {
    const cloudinaryResult = await uploadToCloudinary(req.files.resume[0].buffer, "resume");
    console.log("cloudinaryResult", cloudinaryResult);
    if (!cloudinaryResult) {
      return next(new AppError("Cloudinary resume upload err", 400));
    }

    updatedata.resumeUrl = {
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
      fileName: req.files?.resume[0]?.originalname || `resume-${cloudinaryResult.display_name}`,
    };
  }

  if (fullName !== undefined) updatedata.fullName = fullName;
  if (totalExperience !== undefined) updatedata.totalExperience = totalExperience;
  if (headline !== undefined) updatedata.headline = headline;
  if (location !== undefined)
    updatedata.location = {
      country: location,
    };
  if (dateOfBirth !== undefined) updatedata.dateOfBirth = dateOfBirth;
  if (gender !== undefined) updatedata.gender = gender;

  if (skills && skills.length > 0) updatedata.skills = skills;
  if (languages && languages.length > 0) updatedata.languages = languages;
  if (experience && Object.keys(experience).length > 0) updatedata.experience = experience;
  if (education && Object.keys(education).length > 0) updatedata.education = education;

  if (socialLinks && socialLinks.length > 0) updatedata.socialLinks = socialLinks;

  console.log("updatedata", updatedata);

  Object.assign(candidate, updatedata);

  const updatedCandidate = await candidate.save();
  await user.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
    updatedCandidate,
  });
});

// export const updateCandidateProfessinalinfo = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
//   const { id } = req.user;

//   const { skills, experience, education, resumeUrl, totalExperience, expectedSalary, preferredLocations, preferences } = req.body;

//   const candidate = await CandidateModel.findOne({ user: id });

//   if (!candidate) {
//     return next(new AppError("Candidate profile not found!", 404));
//   }

//   // console.log("candidate:", candidate);

//   if (skills !== undefined) candidate.skills = skills;
//   if (experience !== undefined) candidate.experience = experience;
//   if (education !== undefined) candidate.education = education;
//   if (resumeUrl !== undefined) candidate.resumeUrl = resumeUrl;
//   if (totalExperience !== undefined) candidate.totalExperience = totalExperience;
//   if (expectedSalary !== undefined) candidate.expectedSalary = expectedSalary;
//   if (preferredLocations !== undefined) candidate.preferredLocations = preferredLocations;
//   if (preferences !== undefined) candidate.preferences = preferences;

//   await candidate.save();

//   res.status(200).json({
//     success: true,
//     message: "Updated successfully",
//   });
// });

// export const updatedSocialMediaLinks = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
//   const { id } = req.user;

//   const { skills, experience, education, resumeUrl, totalExperience, expectedSalary, preferredLocations, preferences } = req.body;

//   const candidate = await CandidateModel.findOne({ user: id });

//   if (!candidate) {
//     return next(new AppError("Candidate profile not found!", 404));
//   }

//   console.log("candidate:", candidate);

//   if (skills !== undefined) candidate.skills = skills;
//   if (experience !== undefined) candidate.experience = experience;
//   if (education !== undefined) candidate.education = education;
//   if (resumeUrl !== undefined) candidate.resumeUrl = resumeUrl;
//   if (totalExperience !== undefined) candidate.totalExperience = totalExperience;
//   if (expectedSalary !== undefined) candidate.expectedSalary = expectedSalary;
//   if (preferredLocations !== undefined) candidate.preferredLocations = preferredLocations;
//   if (preferences !== undefined) candidate.preferences = preferences;

//   await candidate.save();

//   res.status(200).json({
//     success: true,
//     message: "Updated successfully",
//   });
// });
