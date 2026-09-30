const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date },
    credentialUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);