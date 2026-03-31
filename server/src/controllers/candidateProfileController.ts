import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import CandidateModel from "../models/candidateModel.js";
import AppError from "../utils/AppError.js";
import multer from "multer";
import UserModel from "../models/userModel.js";

const storage = multer.memoryStorage();

export const multerController = function (fileName: string) {
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new AppError("invalid file type, only PNG, JPG, and JPEG are allowed!", 404), false);
    }
  };
  const upload = multer({ storage, fileFilter });

  return upload.single(fileName);
};

export const getMyProfileController = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id, email } = req.user;

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

export const updateCandidateBasicInfo = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  const reqAvatar = req.file;
  console.log("AVATAR", reqAvatar);
  console.log("body", req.body.phone);

  const { phone, location, dateOfBirth, gender, avatar, headline, biography } = req.body;

  const candidate = await CandidateModel.findOne({ user: id });

  if (!candidate) {
    return next(new AppError("Candidate profile not found!", 404));
  }

  console.log("candidate:", candidate);

  if (phone !== undefined) candidate.phone = phone;
  if (location !== undefined) candidate.location = location;
  if (dateOfBirth !== undefined) candidate.dateOfBirth = dateOfBirth;
  if (gender !== undefined) candidate.gender = gender;
  if (avatar !== undefined) candidate.avatar = avatar;
  if (headline !== undefined) candidate.headline = headline;
  if (biography !== undefined) candidate.biography = biography;

  //   await candidate.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
  });
});

export const updateCandidateProfessinalinfo = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  const { skills, experience, education, resumeUrl, totalExperience, expectedSalary, preferredLocations, preferences } = req.body;

  const candidate = await CandidateModel.findOne({ user: id });

  if (!candidate) {
    return next(new AppError("Candidate profile not found!", 404));
  }

  console.log("candidate:", candidate);

  if (skills !== undefined) candidate.skills = skills;
  if (experience !== undefined) candidate.experience = experience;
  if (education !== undefined) candidate.education = education;
  if (resumeUrl !== undefined) candidate.resumeUrl = resumeUrl;
  if (totalExperience !== undefined) candidate.totalExperience = totalExperience;
  if (expectedSalary !== undefined) candidate.expectedSalary = expectedSalary;
  if (preferredLocations !== undefined) candidate.preferredLocations = preferredLocations;
  if (preferences !== undefined) candidate.preferences = preferences;

  await candidate.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
  });
});

export const updatedSocialMediaLinks = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  const { skills, experience, education, resumeUrl, totalExperience, expectedSalary, preferredLocations, preferences } = req.body;

  const candidate = await CandidateModel.findOne({ user: id });

  if (!candidate) {
    return next(new AppError("Candidate profile not found!", 404));
  }

  console.log("candidate:", candidate);

  if (skills !== undefined) candidate.skills = skills;
  if (experience !== undefined) candidate.experience = experience;
  if (education !== undefined) candidate.education = education;
  if (resumeUrl !== undefined) candidate.resumeUrl = resumeUrl;
  if (totalExperience !== undefined) candidate.totalExperience = totalExperience;
  if (expectedSalary !== undefined) candidate.expectedSalary = expectedSalary;
  if (preferredLocations !== undefined) candidate.preferredLocations = preferredLocations;
  if (preferences !== undefined) candidate.preferences = preferences;

  await candidate.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
  });
});
