const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  statusBadge: { type: String, default: 'AVAILABLE FOR FREELANCE & FULL-TIME' },
  name: { type: String, default: 'Anshika Ramesh Shukla' },
  title: { type: String, default: 'Full Stack MERN Developer | B.E. Computer Science (CGPA: 8.99)' },
  bio: { type: String, default: 'Final-year CS student at Rizvi College of Engineering with hands-on experience in MERN Stack development, workflow automation, and real-time network monitoring.' },
  email: { type: String, default: 'shuklaanshika115@gmail.com' },
  phone: { type: String, default: '+91 8149203613' },
  location: { type: String, default: 'Mumbai, India' },
  githubUrl: { type: String, default: 'https://github.com/Anshika-13301' },
  profileImage: { type: String, default: '' } // Base64 ya Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);