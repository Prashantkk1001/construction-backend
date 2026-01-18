import express from "express";
import adminAuth from "../../middleware/admin.middleware.js";
import { getStats } from "../../controllers/home.controller.js";

const router = express.Router();

router.get("/", adminAuth, getStats);

export default router;
