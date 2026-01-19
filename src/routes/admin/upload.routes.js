// src/routes/admin/upload.routes.js
// ADD this route to your existing upload.routes.js file

import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const UPLOADS_DIR = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// NEW: POST /api/admin/upload/images
router.post('/images', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const baseUrl = process.env.BASE_URL || `https://construction-backend-wtf2.onrender.com`;
    const urls = req.files.map((file) => `${baseUrl}/uploads/${file.filename}`);
    
    res.json({ urls });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
