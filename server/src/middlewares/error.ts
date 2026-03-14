import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "../types/errorTypes.js";
// import AppError from "../../utils/AppError.js";

export async function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
  console.log("ERROR OBJECT:", err);

  err.message = err.message || "Internal Server Error!";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
