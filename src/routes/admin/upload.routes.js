// src/routes/admin/upload.routes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();

// ES modules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup (uploads/ folder बाहेर src चा)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../uploads'); // root/uploads
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: multer.memoryStorage(),  // RAM → Faster (no disk write)
  limits: { 
    fileSize: 5 * 1024 * 1024,  // 5MB
    files: 10 
  }
});

router.post('/images', upload.array('images', 10), (req, res) => {
  // Save to disk after upload
  const files = [];
  req.files.forEach(file => {
    const filename = Date.now() + '-' + file.originalname;
    const filepath = path.join(__dirname, '../../../uploads', filename);
    fs.writeFileSync(filepath, file.buffer);
    files.push(`/uploads/${filename}`);
  });
  res.json({ success: true, urls: files });
});


export default router;
