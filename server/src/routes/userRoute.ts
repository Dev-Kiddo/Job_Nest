import { Router } from "express";
import { deleteUserHandler, fetchSingleUserHandler, fetchUsersHandler, updateUserHandler } from "../controllers/userController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = Router();

router.route("/users").get(protectAuth, roleAuth("admin"), fetchUsersHandler);
router.route("/users/:id").get(protectAuth, fetchSingleUserHandler).put(protectAuth, updateUserHandler).delete(deleteUserHandler);

export default router;
