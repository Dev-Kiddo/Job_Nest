import express from "express";
import { createCategories, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = express.Router();

router.route("/").get(getCategories).post(createCategories);
router.route("/:id").patch(roleAuth("admin"), updateCategory).delete(deleteCategory);
// router.route("/lists").get(getCategoryLists);

export default router;
