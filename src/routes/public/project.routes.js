import express from "express";
import Project from "../../models/Project.js"; // Your Project model

const router = express.Router();

/* ================= PUBLIC PROJECTS ================= */
router.get("/", async (req, res) => {
  try {
    const { section } = req.query;
    const filter = section ? { section } : {};
    
    const projects = await Project.find(filter)
      .select('-__v') // Hide Mongo internals
      .sort({ createdAt: -1 })
      .lean(); // Faster query
    
    console.log(`📋 Public: Found ${projects.length} projects`); // DEBUG
    
    res.json(projects);
  } catch (error) {
    console.error("❌ Public projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
