import express from "express";
import Project from "../../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { section } = req.query;
    const filter = section ? { section } : {};
    
    const projects = await Project.find(filter)
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`📋 Public API: ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error("❌ Public projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
