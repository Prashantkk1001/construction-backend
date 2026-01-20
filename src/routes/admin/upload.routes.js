// src/routes/admin/upload.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

// ES modules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10,
  },
});

router.post("/images", upload.array("images", 10), (req, res) => {
  const files = [];

  req.files.forEach((file) => {
    const filename = Date.now() + "-" + file.originalname;
    const filepath = path.join(__dirname, "../../../uploads", filename);

    fs.writeFileSync(filepath, file.buffer);

    // ✅ ALWAYS production-safe URL
    const fileUrl = `${process.env.BACKEND_URL}/uploads/${filename}`;
    files.push(fileUrl);
  });

  res.json({
    success: true,
    urls: files,
  });
});

export default router;
