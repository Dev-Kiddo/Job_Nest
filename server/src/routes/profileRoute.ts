import { Router } from "express";
import { protectAuth } from "../middlewares/protectAuth.js";
import { getMyProfileController, updateCandidateInfo } from "../controllers/ProfileController.js";

import { multerImageHandler } from "../utils/multerHandler.js";
import { imageResizeHandler } from "../utils/imageResizeHandler.js";

const router = Router();

router.route("/profile").get(protectAuth, getMyProfileController).patch(protectAuth, multerImageHandler(), imageResizeHandler, updateCandidateInfo);

export default router;
