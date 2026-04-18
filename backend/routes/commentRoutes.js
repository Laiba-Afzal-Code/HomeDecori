import express from "express";
import Comment from "../models/Comments.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE COMMENT */
router.post("/", protect, async (req, res) => {
  try {
    const { postId, text, parentId } = req.body;

    if (!postId || !text?.trim()) {
      return res.status(400).json({ message: "Post ID and text are required" });
    }

    const newComment = new Comment({
      postId,
      userId: req.user.id,
     username: req.user.name,

      text: text.trim(),
      parentId: parentId || null,
    });

    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET COMMENTS BY POST */
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE COMMENT */
router.put("/:id", protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    comment.text = text.trim();
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE COMMENT */
router.delete("/:id", protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const isOwner = comment.userId.toString() === req.user.id;
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
