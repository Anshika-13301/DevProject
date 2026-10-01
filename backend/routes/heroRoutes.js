const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const authMiddleware = require('../middleware/auth'); // Aapka JWT middleware

// GET: Fetch Hero details
router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({}); // Create default record if none exists
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PUT: Update Hero details (Admin Only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true });
    } else {
      hero = await Hero.create(req.body);
    }
    res.json({ message: 'Hero section updated successfully', hero });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update', error: error.message });
  }
});

module.exports = router;