const express = require('express');
const router = express.Router();
const heroSlideController = require('../controllers/heroSlideController');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public route to get slides
router.get('/', heroSlideController.getAllSlides);

// Admin routes
//Create Slides
router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    heroSlideController.uploadSlideImageMiddleware,
    heroSlideController.createSlide
);
//Update Slides
router.patch(
    '/:id',
    authMiddleware,
    adminMiddleware,
    heroSlideController.uploadSlideImageMiddleware,
    heroSlideController.updateSlide
);
// Delete Slides
router.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    heroSlideController.deleteSlide
);

module.exports = router;