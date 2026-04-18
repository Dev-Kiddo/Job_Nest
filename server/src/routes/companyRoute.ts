import express from "express";
import { createCompanyInfoHandler } from "../controllers/companyController.js";
import { protectAuth } from "../middlewares/protectAuth.js";

const router = express.Router();

router.route("/create-company").post(protectAuth, createCompanyInfoHandler);

export default router;
