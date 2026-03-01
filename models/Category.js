const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: String,
  description: String,
  subItems: [String]
});

const itemSchema = new mongoose.Schema({
  name: String,
  maxCoverage: String
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sections: [sectionSchema],
  items: [itemSchema],
  laborOnly: { type: Number, default: 0 },
  allInclusive: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);