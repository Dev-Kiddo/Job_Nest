import multer from "multer";
import AppError from "./AppError.js";
import type { Request } from "express";

export const multerImageHandler = function (fileName: string) {
  const storage = multer.memoryStorage();

  const fileFilter = (req: Request, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new AppError("invalid file type, only PNG, JPG, and JPEG are allowed!", 404), false);
    }
  };
  const upload = multer({ storage, fileFilter });

  return upload.single(fileName);
};
