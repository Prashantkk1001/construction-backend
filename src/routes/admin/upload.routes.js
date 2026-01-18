import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ================= MULTER STORAGE ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // root uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= UPLOAD IMAGE ================= */
/**
 * FINAL API:
 * POST /api/admin/upload/image
 */
router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  console.log("✅ Uploaded:", imageUrl); // DEBUG LOG

  res.status(200).json({
    success: true,
    url: imageUrl, // 🔥 THIS IS IMPORTANT
  });
});

export default router;
