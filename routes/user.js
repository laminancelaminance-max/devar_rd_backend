const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const userController = require('../controllers/userController');

// All routes below are protected
router.use(protect);

// User routes (accessible to authenticated users)
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateOwnProfile);
router.delete('/profile', userController.deleteOwnAccount);

// Admin only routes (commented out until needed)
// const { authorize } = require('../middleware/auth');
// router.get('/', authorize('admin'), userController.getAllUsers);
// router.get('/:id', authorize('admin'), userController.getUserById);
// router.put('/:id', authorize('admin'), userController.updateUser);
// router.delete('/:id', authorize('admin'), userController.deleteUser);

module.exports = router;