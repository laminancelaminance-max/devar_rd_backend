const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get full category data by ID
router.get('/:id/full', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update entire category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ FIXED: Create or return existing category (idempotent)
router.post('/', async (req, res) => {
  try {
    // Check if category with this name already exists
    const existingCategory = await Category.findOne({ name: req.body.name });
    
    if (existingCategory) {
      // Return existing category with 200 status (not 201)
      console.log('Category already exists, returning existing:', existingCategory.name);
      return res.status(200).json(existingCategory);
    }

    // Create new category only if it doesn't exist
    const category = new Category(req.body);
    await category.save();
    console.log('New category created:', category.name);
    res.status(201).json(category);
  } catch (error) {
    console.error('Error in category creation:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;