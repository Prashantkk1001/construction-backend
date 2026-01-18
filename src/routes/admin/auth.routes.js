import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../../models/Admin.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(401).json({ message: "Invalid" });

  const match = await bcrypt.compare(req.body.password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
