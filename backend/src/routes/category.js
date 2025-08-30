import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/")
  .get(getCategories)
  .post(createCategory);

router.route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;