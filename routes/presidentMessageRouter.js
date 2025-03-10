const express = require("express");
const router = express.Router();
const presidentMessageController = require("../controllers/presidentMessageController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public endpoint to get
router.get("/", presidentMessageController.getPresidentMessage);

// Admin-only: update page-level info
router.patch(
  "/",
  authMiddleware,
  adminMiddleware,
  presidentMessageController.uploadPresidentImageMiddleware,
  presidentMessageController.updatePresidentMessage
);

module.exports = router;
