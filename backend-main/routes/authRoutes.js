// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const verifyToken = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');


// router.post('/signup', authController.register);
// router.post('/login', authController.login);
// router.post('/signup', upload.single('profileImage'), signup);


// // Example protected route
// router.get('/profile', verifyToken, (req, res) => {
//   res.status(200).json({ message: "Protected route accessed", user: req.user });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const verifyToken = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');

// // Registration route with image upload support and error handling
// router.post('/signup', (req, res, next) => {
//   // Use multer middleware with error handling
//   upload.single('profileImage')(req, res, (err) => {
//     if (err) {
//       console.error('Multer error:', err);
//       if (err.code === 'LIMIT_FILE_SIZE') {
//         return res.status(400).json({ message: 'File size too large. Maximum 5MB allowed.' });
//       }
//       if (err.message === 'Only image files are allowed!') {
//         return res.status(400).json({ message: 'Only image files are allowed!' });
//       }
//       return res.status(400).json({ message: 'File upload error: ' + err.message });
//     }
//     // If no error, proceed to controller
//     authController.register(req, res);
//   });
// });

// // Login route
// router.post('/login', authController.login);

// // Example protected route
// router.get('/profile', verifyToken, (req, res) => {
//   res.status(200).json({ message: "Protected route accessed", user: req.user });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Registration route with local image upload support and error handling
router.post('/signup', (req, res, next) => {
  // Use multer middleware with error handling
  upload.single('profileImage')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large. Maximum 5MB allowed.' });
      }
      if (err.message.includes('Only image files')) {
        return res.status(400).json({ message: 'Only image files (JPEG, JPG, PNG, GIF) are allowed!' });
      }
      return res.status(400).json({ message: 'File upload error: ' + err.message });
    }
    // If no error, proceed to controller
    authController.register(req, res);
  });
});

// Login route
router.post('/login', authController.login);

// Example protected route
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;