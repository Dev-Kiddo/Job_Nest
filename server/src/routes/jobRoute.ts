import express from "express";
import { createJobsHandler, getJobsHandler, getSingleJobHandler } from "../controllers/jobController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
const router = express.Router();

router.route("/").get(getJobsHandler).post(protectAuth, createJobsHandler);
router.route("/:id").get(protectAuth, getSingleJobHandler);

export default router;
