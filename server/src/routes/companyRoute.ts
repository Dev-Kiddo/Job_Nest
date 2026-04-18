import express from "express";
import { createCompanyInfoHandler } from "../controllers/companyController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { multerImageHandler } from "../utils/multerHandler.js";
import { imageResizeHandler } from "../utils/imageResizeHandler.js";

const router = express.Router();

router.route("/").post(protectAuth, multerImageHandler(), imageResizeHandler, createCompanyInfoHandler);

export default router;
