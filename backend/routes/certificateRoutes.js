const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { protectAdmin } = require('../middleware/authMiddleware');

// Get All Certificates (Public)
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add New Certificate (Admin Only)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, issuer, issueDate, credentialUrl } = req.body;
    const newCert = new Certificate({ title, issuer, issueDate, credentialUrl });
    const saved = await newCert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Certificate (Admin Only)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { title, issuer, issueDate, credentialUrl } = req.body;

    const updatedCert = await Certificate.findByIdAndUpdate(
      req.params.id,
      { title, issuer, issueDate, credentialUrl },
      { new: true, runValidators: true }
    );

    if (!updatedCert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json(updatedCert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Certificate (Admin Only)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deletedCert = await Certificate.findByIdAndDelete(req.params.id);
    if (!deletedCert) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;