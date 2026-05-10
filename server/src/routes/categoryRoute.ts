import express from "express";
import { createCategories, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = express.Router();

router.route("/").get(getCategories).post(roleAuth("admin"), createCategories);
router.route("/:id").patch(roleAuth("admin"), updateCategory).delete(deleteCategory);

export default router;
