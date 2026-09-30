const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protectAdmin } = require('../middleware/authMiddleware');

// Get All Projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add New Project (Admin Only)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, description, techStack, liveDemoUrl, githubUrl } = req.body;
    const newProject = new Project({ title, description, techStack, liveDemoUrl, githubUrl });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Project (Admin Only)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { title, description, techStack, liveDemoUrl, githubUrl } = req.body;
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, techStack, liveDemoUrl, githubUrl },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Project (Admin Only)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;