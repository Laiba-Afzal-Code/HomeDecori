import express from "express";
import { getAllUsers, getDashboardStats } from "../controllers/adminController.js";
import  protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

/**
 * GET /api/admin/dashboard-stats
 */
router.get(
  "/dashboard-stats",
  protect,
  adminOnly,
  getDashboardStats
);

// GET /api/admin/users
router.get("/users", protect, adminOnly, getAllUsers);

export default router;
