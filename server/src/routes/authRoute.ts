import { Router } from "express";
import {
  forgotPasswordHandler,
  getCurrentUser,
  getSessionsHandler,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
  resendVerificationEmailHandler,
  resetPasswordhandler,
  revokeSessionHandler,
  updatePasswordHandler,
  verifyEmailHandler,
} from "../controllers/authController.js";
import { googleAuthHandler, googleCallbackHandler } from "../controllers/googleAuthController.js";
import { protectAuth } from "../middlewares/protectAuth.js";

const router = Router();

router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);
router.route("/refresh-token").get(refreshAccessTokenHandler);
router.route("/verify-email").get(verifyEmailHandler);
router.route("/forgot-password").post(forgotPasswordHandler);
router.route("/reset-password").post(resetPasswordhandler);
router.route("/update-password").post(protectAuth, updatePasswordHandler);
router.route("/resend-verification").get(protectAuth, resendVerificationEmailHandler);

router.route("/me").get(protectAuth, getCurrentUser);

router.route("/google").get(googleAuthHandler);
router.route("/google/callback").get(googleCallbackHandler);

router.route("/logout").get(logoutHandler);

router.get("/sessions", protectAuth, getSessionsHandler);
router.delete("/sessions/:id", protectAuth, revokeSessionHandler);

export default router;
