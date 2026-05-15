import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import CategoryModel from "../models/categoryModel.js";
import AppError from "../utils/AppError.js";
import JobQueryParser from "../utils/jobQueryParser.js";

export const getCategories = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  // console.log("req", req.query);

  const query = { ...req.query };
  // const excludeFields = ["filter", "page", "limit", "sort"];

  // excludeFields.forEach((field) => delete query[field]);

  const features = new JobQueryParser(CategoryModel.find(), query).filter().search().fields().sort().pagination();

  const category = await features.query;

  if (category.length <= 0) {
    return next(new AppError("No categories found", 200));
  }

  res.status(200).json({
    success: true,
    message: "Fetch category success",
    count: category.length,
    category,
  });
});

export const createCategories = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { name, description } = req.body;

  const category = await CategoryModel.findOne({ name });

  if (category) {
    return next(new AppError("Category already in list", 400));
  }

  const newCategory = await CategoryModel.create({
    name,
    description,
  });

  return res.status(200).json({
    success: true,
    message: "Create category successfull",
    category: newCategory,
  });
});

export const updateCategory = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedCategory) {
    return next(new AppError("Category not found!", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Update category successfull",
    category: updatedCategory,
  });
});

export const deleteCategory = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const deleteCategory = await CategoryModel.findByIdAndDelete(id, req.body);

  console.log("deleteCategory", deleteCategory);

  if (!deleteCategory) {
    return next(new AppError("Category not found!", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Delete category successfull",
  });
});

// export const getCategoryLists = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
//   const categoryLists = await CategoryModel.find({}).select({ name: 1, _id: 0 });

//   console.log("categoryLists", categoryLists);
// });
