import { Router } from "express";
import { activateUserHandler, changeUserRoleHandler, deleteUserHandler, fetchSingleUserHandler, fetchUsersHandler, updateUserHandler } from "../controllers/userController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = Router();

router.route("/users").get(protectAuth, roleAuth("admin"), fetchUsersHandler);

router.route("/users/:id").get(protectAuth, fetchSingleUserHandler).patch(protectAuth, updateUserHandler).delete(deleteUserHandler);

router.route("/users/:id/activate").get(protectAuth, roleAuth("admin"), activateUserHandler);

router.route("/users/:id/role").get(protectAuth, roleAuth("admin"), changeUserRoleHandler);

export default router;
