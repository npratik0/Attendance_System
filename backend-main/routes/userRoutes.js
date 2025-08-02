const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// All routes require authentication
router.use(verifyToken);

// Get current user (for dashboard greeting)
router.get('/me', userController.getCurrentUser);

// Get full profile
router.get('/profile', userController.getProfile);

// Update profile
router.put('/profile', userController.updateProfile);

// Change Password
router.post('/change-password', verifyToken, userController.changePassword);

module.exports = router;