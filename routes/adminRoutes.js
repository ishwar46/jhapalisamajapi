// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Import middlewares
const authMiddleware = require('../middleware/authMiddleware');
const superAdminMiddleware = require('../middleware/superAdminMiddleware');


router.post('/promote', authMiddleware, superAdminMiddleware, adminController.promoteUser);

module.exports = router;
