import { Router } from "express";
import { activateUserHandler, changeUserRoleHandler, deleteUserHandler, fetchSingleUserHandler, fetchUsersHandler, updateUserHandler } from "../controllers/userController.js";
import { protectAuth } from "../middlewares/protectAuth.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = Router();

router.route("/").get(protectAuth, roleAuth("admin"), fetchUsersHandler);

router.route("/:id").get(protectAuth, fetchSingleUserHandler).patch(protectAuth, updateUserHandler).delete(deleteUserHandler);

router.route("/:id/activate").get(protectAuth, roleAuth("admin"), activateUserHandler);

router.route("/:id/role").get(protectAuth, roleAuth("admin"), changeUserRoleHandler);

export default router;
