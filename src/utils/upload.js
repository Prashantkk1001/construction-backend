// src/utils/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/* ================= ESM __dirname FIX ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= UPLOADS DIRECTORY ================= */
// uploads folder at PROJECT ROOT
const uploadsDir = path.join(__dirname, "../../uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* ================= MULTER STORAGE ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

/* ================= FILE FILTER ================= */
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

/* ================= MULTER INSTANCE ================= */
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

/* ================= EXPORT ================= */
export const uploadSingle = upload.single("image");
export const uploadArray = upload.array("images", 10);
export const uploadAny = upload.any();
