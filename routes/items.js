const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items for a category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const items = await Item.find({ 
            categoryId: req.params.categoryId,
            isActive: true 
        }).sort({ section: 1, order: 1 });
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new item
router.post('/', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Bulk update items
router.put('/bulk/update', async (req, res) => {
    try {
        const updates = req.body;
        const updatePromises = updates.map(update => 
            Item.findByIdAndUpdate(
                update._id,
                { ...update, updatedAt: Date.now() },
                { new: true }
            )
        );
        
        const updatedItems = await Promise.all(updatePromises);
        res.json({ success: true, data: updatedItems });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete item (soft delete)
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, { isActive: false });
        res.json({ success: true, message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;