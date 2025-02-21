const express = require("express");
const router = express.Router();
const impactController = require("../controllers/impactController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public endpoint to get
router.get("/", impactController.getImpactSummaryPage);

// Admin-only: update page-level info
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  impactController.updateImpactSummaryPage
);

module.exports = router;
