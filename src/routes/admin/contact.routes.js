import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  getContact,
  saveContact,
} from "../../controllers/contact.controller.js";

const router = express.Router();

/* Admin can view contact settings */
router.get("/", authMiddleware, getContact);

/* Admin can add / update contact settings */
router.put("/", authMiddleware, saveContact);

export default router;
