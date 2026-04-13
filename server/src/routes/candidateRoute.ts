import { Router } from "express";
import { protectAuth } from "../middlewares/protectAuth.js";
import { getMyProfileController, updateCandidateBasicInfo, updateCandidateProfessinalinfo } from "../controllers/candidateProfileController.js";
import { multerImageHandler } from "../utils/multerHandler.js";
import { imageResizeHandler } from "../utils/imageResizeHandler.js";

const router = Router();

router.route("/candidate/profile").get(protectAuth, getMyProfileController);

router.route("/candidate/profile/basic-info").put(protectAuth, multerImageHandler("avatar"), imageResizeHandler, updateCandidateBasicInfo);

router.route("/candidate/profile/professional-info").put(protectAuth, updateCandidateProfessinalinfo);

export default router;
