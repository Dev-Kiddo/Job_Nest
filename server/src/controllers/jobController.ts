import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JobModel from "../models/jobModel.js";
import { jobValidations } from "../validators/jobValidations.js";
import CategoryModel from "../models/categoryModel.js";
import CompanyModel from "../models/companyModel.js";
import JobQueryParser from "../utils/jobQueryParser.js";

export const getJobsHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const query = { ...req.query };

  // const excludeFields = ["search", "sort", "page", "limit", "fields"];

  // // Filteing

  // excludeFields.forEach((field) => delete query[field]);

  // const queryStr = JSON.stringify(query).replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

  // let jobQuery = JobModel.find(JSON.parse(queryStr));

  // // Search
  // if (req.query.search) {
  //   jobQuery = jobQuery.find({
  //     title: { $regex: req.query.search, $options: "i" },
  //   });
  // }

  // // Sorting
  // if (req.query.sort) {
  //   const sortby = req.query.sort.split(",").join(" ");

  //   jobQuery = jobQuery.sort(`${sortby}`);
  // } else {
  //   jobQuery = jobQuery.sort("-createAt");
  // }

  // // Fields
  // if (req.query.fields) {
  //   let reqFields = req.query.fields;

  //   const fields = reqFields.split(",").join(" ");

  //   jobQuery = jobQuery.select(fields);
  // }

  // // Pagination

  // if (Number(req?.query?.page) < 1 || Number(req?.query?.limit) < 1) {
  //   return next(new AppError("Page or Limit must be greater than 0", 400));
  // }

  // const totalJobs = await JobModel.countDocuments();

  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 5;

  // const totalPages = Math.ceil(totalJobs / limit);

  // if (page > totalPages) {
  //   return next(new AppError("Page does not exist", 400));
  // }

  // const skip = page * limit - limit;
  // jobQuery = jobQuery.skip(skip).limit(limit);

  const features = new JobQueryParser(JobModel.find(), query).filter().search().sort().fields().pagination();

  const jobs = await features.query;

  // console.log("JOBS", jobs);

  if (jobs.length <= 0) {
    return next(new AppError("No Jobs found", 200));
  }

  return res.status(200).json({
    success: true,
    message: "Get all jobs successfully",
    count: jobs.length,
    jobs,
  });
});

export const createJobsHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const result = jobValidations.safeParse(req.body);

  if (!result.success) {
    return next(new AppError("* Fields is required", 400));
  }

  const { user } = req;

  if (!user) {
    return next(new AppError("Invalid or expired token!", 401));
  }

  const { title, description, companyId, category, skillsRequired, experianceRequired, educationRequired, salary, location } = req.body;

  const getCategory = await CategoryModel.findOne({ name: category });

  if (!getCategory) {
    return next(new AppError("Category not found!", 200));
  }

  const getCompany = await CompanyModel.findById({ _id: companyId });

  if (!getCompany) {
    return next(new AppError("Company not found!", 200));
  }

  const verifyPosted = getCompany.user.find((id) => id.equals(user.id));

  if (!verifyPosted) {
    return next(new AppError("Recruiter not found!", 200));
  }

  let job = {};

  if (title !== undefined) job.title = title;
  if (description !== undefined) job.description = description;
  if (companyId !== undefined) job.company = getCompany._id;
  if (category !== undefined) job.category = getCategory._id;
  if (skillsRequired !== undefined) job.skillsRequired = skillsRequired;
  if (experianceRequired !== undefined) job.experianceRequired = experianceRequired;
  if (educationRequired !== undefined) job.educationRequired = educationRequired;
  if (salary !== undefined) job.salary = salary;
  if (location !== undefined) job.location = location;
  job.postedBy = user.id;
  job.publishedAt = Date.now();

  const newJob = await JobModel.create(job);

  // console.log("newJob", newJob);

  res.status(200).json({
    success: true,
    message: "Create a job successfull",
    job: newJob,
  });
});
