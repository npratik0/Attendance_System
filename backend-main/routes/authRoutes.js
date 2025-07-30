// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const verifyToken = require('../middleware/authMiddleware');

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.get('/me', verifyToken, authController.getMe);

// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/signup', authController.register);
router.post('/login', authController.login);

// Example protected route
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;
