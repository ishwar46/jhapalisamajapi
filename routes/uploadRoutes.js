// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controller/uploadController');
const authMiddleware = require('../middleware/authMiddleware');

// For profile picture
router.post(
    '/profile-picture',
    authMiddleware,
    uploadController.uploadProfilePicture
);

// For a receipt file
router.post(
    '/receipt',
    authMiddleware,
    uploadController.uploadReceipt
);


module.exports = router;
