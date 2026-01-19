// src/routes/admin/project.routes.js
import express from "express";
import Project from "../../models/Project.js";
import adminMiddleware from "../../middleware/admin.middleware.js";

const router = express.Router();

// GET /api/admin/projects?section=Residential
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const { section } = req.query;
    const filter = section ? { section: section.toString() } : {};
    
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/admin/projects
router.post("/", adminMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/admin/projects/:id
router.put("/:id", adminMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/admin/projects/:id
router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
