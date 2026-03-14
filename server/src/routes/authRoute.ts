import { Router } from "express";
import registerHandler from "../controllers/authController.js";

const router = Router();

router.route("/register").post(registerHandler);

export default router;
