import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import CandidateModel from "../models/candidateModel.js";
import RecruiterModel from "../models/recruiterModel.js";

export const fetchUsersHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const users = await UserModel.find({});

  if (users.length === 0) {
    return next(new AppError("Users not registered yet!", 204));
  }

  res.status(200).json({
    success: true,
    message: "users fetched successfully",
    numOfUsers: users.length,
    users,
  });
});

export const fetchSingleUserHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("User ID is required.", 400));
  }

  const user = await UserModel.findById({ _id: id });

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "user fetched successfully",
    user,
  });
});

export const updateUserHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("User ID is required.", 400));
  }

  const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

  if (!user) {
    return next(new AppError("User not found!.", 400));
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

export const deleteUserHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("User ID is required.", 400));
  }

  const user = await UserModel.findById(id);

  if (!user) {
    return next(new AppError("User not found!", 400));
  }

  user.isActive = false;

  if (user.role === "candidate") {
    const candidate = await CandidateModel.findOne({ user: id });

    if (!candidate) {
      return next(new AppError("Candidate not found!", 400));
    }

    candidate.isActive = false;

    await candidate.save();
  }

  if (user.role === "recruiter") {
    const recruiter = await RecruiterModel.findOne({ user: id });

    if (!recruiter) {
      return next(new AppError("recruiter not found!", 400));
    }

    recruiter.isActive = false;

    await recruiter.save();
  }

  res.clearCookie("accessToken");
  await user.save();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
