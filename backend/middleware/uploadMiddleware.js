import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, ""); // 🔥 remove @ ( ) etc

    cb(null, Date.now() + "-homedecorim-" + cleanName);
  },
});

export const upload = multer({ storage });
