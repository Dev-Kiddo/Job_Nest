import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";

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
