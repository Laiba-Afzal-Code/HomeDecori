import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiimageRoutes from "./routes/aiimageRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { upload } from "./middleware/uploadMiddleware.js";
import contactRoutes from "./routes/contactRoute.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(cors({
 origin: "*"
}));
app.use(express.json());

// ⭐ VERY IMPORTANT (serve images)
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({
    success: true,
    imageUrl,
    filename: req.file.filename,
  });
});
app.get("/api/test", (req,res)=>{
res.send("API working");
});
// AI Room Design route
app.use("/api", aiimageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
