const express = require("express");
const router = express.Router();
const attendeeController = require("../controllers/attendeeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public endpoint to get
router.get("/", attendeeController.getAttendeePage);

// Admin-only: update page-level info (page title and subtitle)
router.get(
  "/attendees",
  authMiddleware,
  adminMiddleware,
  attendeeController.getAllAttendees
);
// Admin-only: get all attendees
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  attendeeController.updateAttendeePage
);

// Attendee registration
router.post("/attendees", attendeeController.attendeeRegistration);

// Admin-only: verify an existing attendee
router.patch(
  "/attendees/verify-attendee/:attendeeId",
  authMiddleware,
  adminMiddleware,
  attendeeController.verifyAttendee
);
// Admin-only: update an existing attendee
router.patch(
  "/attendees/:attendeeId",
  authMiddleware,
  adminMiddleware,
  attendeeController.updateAttendee
);

// Admin-only: delete an existing attendee
router.delete(
  "/attendees/:attendeeId",
  authMiddleware,
  adminMiddleware,
  attendeeController.deleteAttendee
);

module.exports = router;
