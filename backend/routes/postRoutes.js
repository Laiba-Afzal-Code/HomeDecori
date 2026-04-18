import express from "express";
import {
  createPost,
  updatePost,
  getAllPosts,
  getLatestPosts,
  getPostById,
  getPostsByCate,
  deletePost,
  getPostBySlug,
  searchPosts,
  getPostsByAuthor,
} from "../controllers/postController.js";
import  protect  from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
const router = express.Router();
router.get("/search", searchPosts);
router.get("/getallposts", getAllPosts);
router.get("/latest", getLatestPosts);

router.get("/slug/:slug", getPostBySlug);
router.get("/author/:authorId", getPostsByAuthor);
router.get("/category/:category", getPostsByCate);
router.get("/:id", getPostById);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updatePost
);
router.post(
  "/createpost",
  protect,
  adminOnly,
  upload.single("image"),
  createPost
);
router.delete("/:id", protect, adminOnly, deletePost);

export default router;
