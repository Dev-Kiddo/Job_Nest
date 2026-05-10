import express from "express";
import { createJobsHandler, getJobsHandler } from "../controllers/jobController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
const router = express.Router();

router.route("/").get(protectAuth, getJobsHandler).post(protectAuth, createJobsHandler);

export default router;
