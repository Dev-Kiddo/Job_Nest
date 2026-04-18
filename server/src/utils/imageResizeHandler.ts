import type { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { asyncHandler } from "./asyncHandler.js";

export const imageResizeHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  if (!req.files) next();

  // console.log("BEFORE", req.files);

  for (const [key, val] of Object.entries(req.files)) {
    if (req.files.avater) {
      const resizeBuff = await sharp(val[0].buffer).resize(250, 250, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();

      req.files[key][0].buffer = resizeBuff;
    }

    if (req.files.logo) {
      const resizeBuff = await sharp(val[0].buffer).resize(250, 250, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();

      req.files[key][0].buffer = resizeBuff;
    }

    if (req.files.banner) {
      const resizeBuff = await sharp(val[0].buffer).resize(1000, 350, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();

      req.files[key][0].buffer = resizeBuff;
    }
  }

  // const resizedBuffer = await sharp(req.file?.buffer).resize(width, height, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();

  // req.files.buffer = resizedBuffer;

  // console.log("requestFile", req.files);

  next();
});
