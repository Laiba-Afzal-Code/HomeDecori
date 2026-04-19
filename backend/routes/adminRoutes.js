import express from "express";
import { deleteUser, getAllUsers, getDashboardStats } from "../controllers/adminController.js";
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
// DELETE USER / ADMIN
router.delete("/user/:id", protect, adminOnly, deleteUser);
export default router;

