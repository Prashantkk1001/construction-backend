// src/routes/public/projects.routes.js
import express from "express";
import Project from "../../models/Project.js";

const router = express.Router();

// 🔥 PUBLIC READ-ONLY - User dashboard साठी (NO CREATE/UPDATE/DELETE)
router.get("/", async (req, res) => {
  try {
    const { section } = req.query;
    const filter = section ? { section: section.toString() } : {};
    
    // Public data - published projects only
    const projects = await Project.find({
      ...filter,
      // Add if you have publish status
      // isPublished: true
    })
    .select('-__v')  // Hide Mongo internal fields
    .sort({ createdAt: -1 })
    .limit(50)  // Performance
    .lean();  // Fast JSON
    
    // 🔥 FULL URLs - Frontend साठी absolute URLs
    const projectsWithFullUrls = projects.map(project => ({
      ...project,
      images: project.images.map(img => 
        `https://construction-backend-wtf2.onrender.com${img}`
      )
    }));
    
    res.json({
      success: true,
      count: projectsWithFullUrls.length,
      data: projectsWithFullUrls
    });
    
  } catch (error) {
    console.error('Public projects error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Projects fetch failed" 
    });
  }
});

// Optional: Featured projects
router.get("/featured", async (req, res) => {
  try {
    const projects = await Project.find({ isFeatured: true })
      .limit(6)
      .sort({ createdAt: -1 })
      .lean();
    
    const featured = projects.map(p => ({
      ...p,
      images: p.images.map(img => `https://construction-backend-wtf2.onrender.com${img}`)
    }));
    
    res.json({ success: true, data: featured });
  } catch (error) {
    res.status(500).json({ message: "Featured fetch failed" });
  }
});

export default router;
