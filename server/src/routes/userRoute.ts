import { Router } from "express";
import { fetchUsersHandler } from "../controllers/userController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = Router();

router.route("/users").get(roleAuth("admin"), fetchUsersHandler);

export default router;
