import type { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { asyncHandler } from "./asyncHandler.js";

export const imageResizeHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  if (!req.file) next();

  const resizedBuffer = await sharp(req.file?.buffer).resize(300, 300, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();

  req.file.buffer = resizedBuffer;

  next();
});
