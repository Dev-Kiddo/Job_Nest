import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import JobModel from "../models/jobModel.js";
import ApplicationModel from "../models/applicationModel.js";
import CompanyModel from "../models/companyModel.js";
import JobQueryParser from "../utils/jobQueryParser.js";
import Profilemodel from "../models/profileModel.js";

export const fetchApplicationsHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const query = { ...req.query };

  const totalApplicants = await ApplicationModel.countDocuments();

  const features = new JobQueryParser(
    ApplicationModel.find()
      .populate("company", "logo")
      .populate("job", "title salary jobType location createdAt isActive")
      .populate("applicant", "name")
      .populate("profile", "fullName headline totalExperience"),
    query,
  )
    .search()
    .filter()
    .fields()
    .sort()
    .pagination();

  const application = await features.query;
  // const application = await ApplicationModel.find({});

  if (application.length <= 0) {
    return next(new AppError("No application found!", 200));
  }

  return res.status(200).json({
    success: true,
    message: "Fetch all application success",
    totalApplicants,
    count: application.length,
    application,
  });
});

export const createApplicationHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  // console.log(req.body);
  const { applicantId, jobId, coverLetter, resume } = req.body;

  const { user } = req;

  // console.log("USER", user);
  // console.log(applicantId);

  const applicant = await UserModel.findById(applicantId);

  // console.log(applicant);

  if (!applicant) {
    return next(new AppError("Applicant not found!", 400));
  }

  if (user.id !== applicantId) {
    return next(new AppError("User and applicant not match!", 400));
  }

  const userProfile = await Profilemodel.findOne({ user: applicant._id });

  if (!userProfile) {
    return next(new AppError("User profile not found!", 400));
  }

  const job = await JobModel.findById(jobId);

  if (!job) {
    return next(new AppError("Job not found!", 400));
  }

  const company = await CompanyModel.findById(job?.company);
  console.log("Company", company);

  if (!company) {
    return next(new AppError("Company doesn't have this job", 400));
  }

  if (!resume.name || !resume.url) {
    return next(new AppError("Resume is required!", 400));
  }

  job.applicationCount = job.applicationCount + 1;

  await job.save();

  const application = await ApplicationModel.create({
    applicant: applicant._id,
    job: job._id,
    company: company._id,
    profile: userProfile._id,
    coverLetter,
    resume,
  });

  return res.status(200).json({
    success: true,
    message: "Applied successfully",
    application,
  });
});

export const updatedApplicationStatusHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const application = await ApplicationModel.findByIdAndUpdate(id, req.body, { new: true });

  if (!application) {
    return next(new AppError("Application not found", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Status Updated successfully",
    application,
  });
});
