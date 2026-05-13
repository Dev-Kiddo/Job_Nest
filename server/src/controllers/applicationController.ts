import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import JobModel from "../models/jobModel.js";
import ApplicationModel from "../models/applicationModel.js";

export const fetchApplicationsHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const application = await ApplicationModel.find({});

  if (application.length <= 0) {
    return next(new AppError("No application found!", 200));
  }

  res.status(200).json({
    success: true,
    message: "Fetch all application success",
    count: application.length,
    application,
  });
});

export const createApplicationHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  console.log("hehe");

  console.log(req.body);
  const { applicantId, jobId, coverLetter, resume } = req.body;

  const { user } = req;

  console.log("USER", user);
  console.log(applicantId);

  const applicant = await UserModel.findById(applicantId);

  console.log(applicant);

  if (!applicant) {
    return next(new AppError("Applicant not found!", 400));
  }

  if (user.id !== applicantId) {
    return next(new AppError("User and applicant not match!", 400));
  }

  const job = await JobModel.findById(jobId);

  if (!job) {
    return next(new AppError("Job not found!", 400));
  }

  if (!resume.name || !resume.url) {
    return next(new AppError("Resume is required!", 400));
  }

  const application = await ApplicationModel.create({
    applicant: applicantId,
    job: jobId,
    coverLetter,
    resume,
  });

  res.status(200).json({
    success: true,
    message: "Fetch all application success",
    application,
  });
});
