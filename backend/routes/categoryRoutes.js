import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getNewsletter,
} from "../controllers/categoryController.js";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/newsletter", getNewsletter);
router.post("/createcate", protect, adminOnly, createCategory);

router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;

