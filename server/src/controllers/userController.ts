import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/userModel.js";

export const fetchUsersHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const users = await UserModel.find({});

  console.log("REQ", req.user);

  console.log(users);

  res.send("Fetched");
});
