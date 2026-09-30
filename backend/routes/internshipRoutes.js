const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');

// 💡 FIX: protectAdmin ko import karein
const { protectAdmin } = require('../middleware/authMiddleware');

// GET all internships (Public)
router.get('/', async (req, res) => {
  try {
    const list = await Internship.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE internship (Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const newInternship = new Internship(req.body);
    const saved = await newInternship.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE internship (Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE internship (Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Internship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;