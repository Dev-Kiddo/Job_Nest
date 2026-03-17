import { Router } from "express";
import { loginHandler, logoutHandler, refreshAccessTokenHandler, registerHandler } from "../controllers/authController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { googleAuthHandler, googleCallbackHandler } from "../controllers/googleAuthController.js";

const router = Router();

router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);
router.route("/refresh-token").get(refreshAccessTokenHandler);

router.route("/google").get(googleAuthHandler);
router.route("/google/callback").get(googleCallbackHandler);

router.route("/logout").get(logoutHandler);

export default router;
