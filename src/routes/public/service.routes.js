import express from "express";
import { getServices, addService } from "../controllers/service.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";



const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Public route working" });
});




export default router;
