import express from "express";
import { createCompanyInfoHandler, fetchAllCompaniesHandler, fetchMyCompanyHandler, updateCompanyInfoHandler } from "../controllers/companyController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { multerImageHandler } from "../utils/multerHandler.js";
import { imageResizeHandler } from "../utils/imageResizeHandler.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = express.Router();

router.route("/").get(protectAuth, roleAuth("admin"), fetchAllCompaniesHandler);

router.route("/").post(protectAuth, multerImageHandler(), imageResizeHandler, createCompanyInfoHandler);

router.route("/my-company").get(protectAuth, fetchMyCompanyHandler);

router.route("/:id").patch(protectAuth, updateCompanyInfoHandler);

export default router;
