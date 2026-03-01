const express = require('express');
const router = express.Router();
const UserProject = require('../models/UserProject');

// Get user's projects
router.get('/user/:userId', async (req, res) => {
    try {
        const projects = await UserProject.find({ 
            userId: req.params.userId 
        }).populate('categoryId');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single project
router.get('/:id', async (req, res) => {
    try {
        const project = await UserProject.findById(req.params.id)
            .populate('categoryId')
            .populate('items.itemId');
        res.json(project);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new project
router.post('/', async (req, res) => {
    try {
        const project = new UserProject(req.body);
        await project.save();
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update project
router.put('/:id', async (req, res) => {
    try {
        const project = await UserProject.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        res.json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;