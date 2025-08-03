// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const verifyToken = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');

// // All routes require authentication
// router.use(verifyToken);

// // Get current user (for dashboard greeting)
// router.get('/me', userController.getCurrentUser);

// // Get full profile
// router.get('/profile', userController.getProfile);

// // Update profile
// router.put('/profile', userController.updateProfile);

// // Change Password
// router.post('/change-password', verifyToken, userController.changePassword);

// // Admin adds user (with photo upload)
// router.post('/add-user', authMiddleware, upload.single('photo'), addUser);


// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All routes require authentication
router.use(verifyToken);

// Get current user (for dashboard greeting)
router.get('/me', userController.getCurrentUser);

// Get full profile
router.get('/profile', userController.getProfile);

// Update profile (with optional image upload)
router.put('/profile', upload.single('profileImage'), userController.updateProfile);

// Change Password
router.post('/change-password', userController.changePassword);

module.exports = router;