// routes/auth.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;
