import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { getAllEnquiries } from "../../controllers/enquiry.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getAllEnquiries);

export default router;
