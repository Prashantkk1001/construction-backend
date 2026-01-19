import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/images", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ message: "No files" });
    }
    const baseUrl = "https://construction-backend-wtf2.onrender.com";
    const urls = req.files.map(f => `${baseUrl}/uploads/${f.filename}`);
    res.json({ urls });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;  // ✅ THIS FIXES THE IMPORT ERROR
