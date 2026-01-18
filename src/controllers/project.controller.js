import Project from "../models/Project.js";

/* ===============================
   GET ALL PROJECTS (ADMIN)
================================ */
export const getAllProjectsAdmin = async (req, res) => {
  try {
    const { section } = req.query;

    if (!section) {
      return res.status(400).json({ message: "Section is required" });
    }

    const projects = await Project.find({ section }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* ===============================
   GET SINGLE PROJECT (ADMIN)
================================ */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

/* ===============================
   CREATE PROJECT (ADMIN)
================================ */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch {
    res.status(500).json({ message: "Failed to create project" });
  }
};

/* ===============================
   UPDATE PROJECT (ADMIN)
================================ */
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update project" });
  }
};

/* ===============================
   DELETE PROJECT (ADMIN)
================================ */
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete project" });
  }
};

/* ===============================
   PUBLIC – GET PROJECTS
================================ */
export const getPublicProjects = async (req, res) => {
  try {
    const filter = {};

    if (req.query.section) {
      filter.section = req.query.section;
    }

    const projects = await Project.find(filter).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


/* ===============================
   PUBLIC – GET SINGLE PROJECT
================================ */
export const getPublicProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};
