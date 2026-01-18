import express from "express";
import { getContact } from "../../controllers/contact.controller.js";

const router = express.Router();

/* Public view only */
router.get("/", getContact);

export default router;
