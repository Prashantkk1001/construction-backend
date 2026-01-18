import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  getAllProjectsAdmin,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../../controllers/project.controller.js";

const router = express.Router();

/* SECTION FILTER (ADMIN) */
router.get("/", authMiddleware, getAllProjectsAdmin);

/* SINGLE */
router.get("/:id", authMiddleware, getProjectById);

/* CREATE */
router.post("/", authMiddleware, createProject);

/* UPDATE */
router.put("/:id", authMiddleware, updateProject);

/* DELETE */
router.delete("/:id", authMiddleware, deleteProject);

export default router;
