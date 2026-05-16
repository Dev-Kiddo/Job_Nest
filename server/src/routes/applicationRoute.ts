import express from "express";
import { createApplicationHandler, fetchApplicationsHandler, updateApplicationHandler } from "../controllers/applicationController.js";
import { protectAuth } from "../middlewares/protectAuth.js";

const router = express.Router();

router.route("/").get(protectAuth, fetchApplicationsHandler).post(protectAuth, createApplicationHandler).patch(updateApplicationHandler);

export default router;
