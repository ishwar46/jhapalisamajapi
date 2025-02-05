// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Import middlewares
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const superAdminMiddleware = require('../middleware/superAdminMiddleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected route (any authenticated user)
router.get('/profile', authMiddleware, userController.getProfile);

// Admin-only route
router.get('/all-users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const User = require('../models/User');

        const [users, count] = await Promise.all([
            User.find(),
            User.countDocuments(),
        ]);

        return res.status(200).json({
            totalUsers: count,
            users,
        });
    } catch (error) {
        console.error('all-users route error:', error);
        return res.status(500).json({ error: 'Error fetching users.' });
    }
});

module.exports = router;
