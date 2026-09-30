const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String },
  location: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);