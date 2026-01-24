import express from "express";
import multer from "multer";  // ✅ MISSING IMPORT
import path from "path";

const router = express.Router();

/* ================= MULTER FOR MULTIPLE IMAGES ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= SINGLE IMAGE ================= */
router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  console.log("✅ Single image:", imageUrl);
  res.json({ success: true, url: imageUrl });
});

/* ================= MULTIPLE IMAGES (Frontend needs this) ================= */
router.post("/images", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  
  const urls = req.files.map((file) => `/uploads/${file.filename}`);
  console.log("✅ Multiple images:", urls);
  
  res.json({ success: true, urls });
});

export default router;
