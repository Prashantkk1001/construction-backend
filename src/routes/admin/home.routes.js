import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { getStats } from "../../controllers/home.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getStats);

export default router;
