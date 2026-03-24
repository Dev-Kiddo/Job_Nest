import { Router } from "express";
import {
  forgotPasswordHandler,
  getCurrentUser,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
  verifyEmailHandler,
} from "../controllers/authController.js";
import { googleAuthHandler, googleCallbackHandler } from "../controllers/googleAuthController.js";
import { protectAuth } from "../middlewares/protectAuth.js";

const router = Router();

// router.route("/register").post(uploadHandler, resizeImageHandler, registerHandler);
router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);
router.route("/refresh-token").get(refreshAccessTokenHandler);
router.route("/verify-email").get(verifyEmailHandler);
router.route("/forgot-password").post(forgotPasswordHandler);

router.route("/me").get(protectAuth, getCurrentUser);

router.route("/google").get(googleAuthHandler);
router.route("/google/callback").get(googleCallbackHandler);

router.route("/logout").get(logoutHandler);

export default router;
