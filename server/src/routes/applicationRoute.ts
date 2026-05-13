import express from "express";
import { createApplicationHandler, fetchApplicationsHandler } from "../controllers/applicationController.js";
import { protectAuth } from "../middlewares/protectAuth.js";

const router = express.Router();

router.route("/").get(protectAuth, fetchApplicationsHandler).post(protectAuth, createApplicationHandler);

export default router;
