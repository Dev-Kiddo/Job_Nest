import { Router } from "express";
import { loginHandler, logoutHandler, refreshAccessTokenHandler, registerHandler, verifyEmailHandler } from "../controllers/authController.js";
import { googleAuthHandler, googleCallbackHandler } from "../controllers/googleAuthController.js";

const router = Router();

// router.route("/register").post(uploadHandler, resizeImageHandler, registerHandler);
router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);
router.route("/refresh-token").get(refreshAccessTokenHandler);
router.route("/verify-email").get(verifyEmailHandler);

router.route("/google").get(googleAuthHandler);
router.route("/google/callback").get(googleCallbackHandler);

router.route("/logout").get(logoutHandler);

export default router;
