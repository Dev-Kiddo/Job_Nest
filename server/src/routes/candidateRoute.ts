import { Router } from "express";
import { protectAuth } from "../middlewares/protectAuth.js";
import { getMyProfileController, multerController, updateCandidateBasicInfo, updateCandidateProfessinalinfo } from "../controllers/candidateProfileController.js";

const router = Router();

router.route("/candidate/profile").get(protectAuth, getMyProfileController);
router.route("/candidate/profile/basic-info").put(multerController("avatar"), protectAuth, updateCandidateBasicInfo);
router.route("/candidate/profile/professional-info").put(protectAuth, updateCandidateProfessinalinfo);

export default router;
