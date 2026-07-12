import express from "express";
import {
  createAdmin,
  getProfile,
  login,
  register,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create-admin", createAdmin);

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", protect, getProfile);
export default router;
