import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const roleAuth = function (...roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to access this feature.", 403));
    }

    next();
  };
};
