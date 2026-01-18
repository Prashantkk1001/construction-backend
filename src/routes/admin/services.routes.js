import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Admin services route working" });
});

export default router;
