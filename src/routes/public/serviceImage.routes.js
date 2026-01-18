import express from "express";
import { getServiceImages } from "../../controllers/serviceImage.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Public route working" });
});


export default router;
