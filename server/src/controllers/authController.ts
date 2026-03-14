import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel.js";
import { registerHandlerValidation } from "../validators/authValidations.js";

export async function registerHandler(req: Request, res: Response, next: NextFunction) {
  const result = registerHandlerValidation.safeParse(req.body);

  if (!result.success) {
    return res.status(403).json({
      success: false,
      message: "Fail: All the fields required",
    });
  }
}
