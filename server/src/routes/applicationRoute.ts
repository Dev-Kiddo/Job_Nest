import express from "express";
import { createApplicationHandler, fetchApplicationsHandler, updatedApplicationStatusHandler } from "../controllers/applicationController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = express.Router();

router.route("/").get(protectAuth, fetchApplicationsHandler).post(protectAuth, createApplicationHandler);

router.route("/:id").patch(protectAuth, roleAuth("recruiter"), updatedApplicationStatusHandler);

export default router;
