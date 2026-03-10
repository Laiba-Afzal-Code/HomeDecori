import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/generate-room", upload.single("roomImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const prompt = req.body.style
      ? `Transform this room into a ${req.body.style} interior: modern, balanced lighting, neutral colors, stylish furniture, cozy and peaceful.`
      : `Transform this room into a modern interior: minimal, neutral colors, stylish furniture, calm atmosphere.`;
    `Redesign this room into a modern luxury home decor style with warm lighting, wooden furniture, plants and aesthetic wall decorations`;
    const originalPath = req.file.path;

    const result = await openai.images.edit({
      model: "dall-e-2",
      image: fs.createReadStream(originalPath),
      prompt: prompt,
      size: "1024x1024",
    });

    const base64Image = result.data[0].b64_json;
    const outputName = "ai_" + req.file.filename;
    const outputPath = path.join(uploadDir, outputName);

    fs.writeFileSync(outputPath, base64Image, "base64");

    res.json({ designedImageUrl: `/uploads/${outputName}` });

    // delete original
    fs.unlinkSync(originalPath);
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;
