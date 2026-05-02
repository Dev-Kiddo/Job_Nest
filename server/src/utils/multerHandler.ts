import multer from "multer";
import AppError from "./AppError.js";
import type { Request } from "express";

export const multerImageHandler = function () {
  const storage = multer.memoryStorage();

  const fileFilter = (req: Request, file, cb) => {
    console.log("FILE", file);

    // if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    //   cb(null, true);
    // } else {
    //   cb(new AppError("invalid file type, only PNG, JPG, and JPEG are allowed!", 404), false);
    // }

    const allowedExtensions = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];

    if (allowedExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("invalid file type, only PNG, JPG, and JPEG are allowed!", 404), false);
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]);
};
