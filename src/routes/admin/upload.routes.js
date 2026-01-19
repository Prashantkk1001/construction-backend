import express from "express";
import multer from "multer";
import adminMiddleware from "../../middleware/admin.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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
      url: `/uploads/${file.filename}`,
    }));

    res.status(200).json({ success: true, files });
  }
);

export default router;
