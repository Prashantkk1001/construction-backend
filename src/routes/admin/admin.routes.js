import express from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import { getStats } from "../controllers/home.controller.js";

const router = express.Router();

// Admin dashboard stats
router.get("/stats", adminMiddleware, getStats);

export default router;
