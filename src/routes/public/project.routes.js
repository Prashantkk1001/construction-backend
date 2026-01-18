import express from "express";

import {
  getPublicProjects,
  getPublicProjectById,
} from "../../controllers/project.controller.js";

const router = express.Router();

/* Category filter supported */
router.get("/", getPublicProjects);

/* Single project */
router.get("/:id", getPublicProjectById);

export default router;
