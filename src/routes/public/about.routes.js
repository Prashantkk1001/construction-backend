import express from "express";

import { getAbout } from "../../controllers/about.controller.js";

const router = express.Router();

/* Public view only */
router.get("/", getAbout);

export default router;
