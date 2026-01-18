import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";

import {
  getServiceImages,
  updateServiceImages,
} from "../../controllers/serviceImage.controller.js";

const router = express.Router();

// ADMIN – Service images
router.get("/", adminAuth, getServiceImages);
router.post("/", adminAuth, updateServiceImages);

export default router;
