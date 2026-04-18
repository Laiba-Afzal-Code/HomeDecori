import express from "express";
import {
  createAdmin,
  getProfile,
  login,
  register,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create-admin", createAdmin);

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
export default router;
