const mongoose = require("mongoose");

const spouseSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  contact: {
    type: String,
  },
  country: { type: String, trim: true },
});
const attendeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  country: { type: String, trim: true },
  contact: { type: String, required: true, trim: true },
  verificationStatus: {
    type: Boolean,
    default: false,
  },
  declineReason: {
    type: String,
    default:
      "Your registration did not meet the event criteria. Please review the requirements and try again",
  },
  spouse: { type: spouseSchema, default: null },
});

const attendeePageSchema = new mongoose.Schema(
  {
    pageTitle: { type: String, default: "Register For The Event" },
    pageSubtitle: { type: String, default: "" },
    eventDate: { type: Date, default: "" },
    eventLocation: { type: String, default: "" },
    eventDescription: { type: String, default: "" },
    attendees: [attendeeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AttendeePage", attendeePageSchema);
