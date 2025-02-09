const express = require("express");
const router = express.Router();
const executiveCommitteeController = require("../controllers/executiveCommitteeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public endpoint to retrieve the committee page
router.get("/", executiveCommitteeController.getExecutiveCommitteePage);

// Admin-only endpoints
router.put("/", authMiddleware, adminMiddleware, executiveCommitteeController.updateExecutiveCommitteePage);
router.post("/items", authMiddleware, adminMiddleware, executiveCommitteeController.addCommitteeMember);
router.patch("/items/:memberId", authMiddleware, adminMiddleware, executiveCommitteeController.updateCommitteeMember);
router.delete("/items/:memberId", authMiddleware, adminMiddleware, executiveCommitteeController.deleteCommitteeMember);

module.exports = router;
