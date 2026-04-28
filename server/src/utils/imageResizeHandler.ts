import type { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { asyncHandler } from "./asyncHandler.js";

export const imageResizeHandler = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  if (!req.files) next();

  for (const [key, val] of Object.entries(req.files)) {
    // console.log("KEY", key);
    // console.log("VALUE", val);

    if (key === req.files[key][0].fieldname) {
      let resizeBuff;

      if (key === "banner") {
        resizeBuff = await sharp(val[0].buffer).resize(1584, 396, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();
      }

      if (key === "avatar" || key === "logo") {
        resizeBuff = await sharp(val[0].buffer).resize(250, 250, { fit: "cover", position: "center" }).jpeg({ quality: 80 }).toBuffer();
      }

      req.files[key][0].buffer = resizeBuff;
    }
  }

  // console.log("AFTER REQ FILES", req.files);

  next();
});
