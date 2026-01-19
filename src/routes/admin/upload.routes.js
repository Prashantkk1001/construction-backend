import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import adminMiddleware from "../../middleware/admin.middleware.js";

const router = express.Router();

/* ================= ESM dirname fix ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MULTER STORAGE (FIXED) ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // uploads folder at PROJECT ROOT
    cb(null, path.join(__dirname, "../../../uploads"));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

/* ================= UPLOAD API ================= */
// POST /api/admin/upload/images
router.post(
  "/images",
  adminMiddleware,
  upload.array("images", 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const files = req.files.map((file) => ({
      url: `/uploads/${file.filename}`, // 👈 frontend uses this
    }));

    res.status(200).json({
      success: true,
      files,
    });
  }
);

export default router;
