import express from "express";
const router = express.Router();

import {upload } from "../middleware/uploadMiddleware.js";
import {submitBlog} from "../controllers/blogController.js";

router.post(
"/submit",
upload.single("image"),
submitBlog
);

export default router;