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
    type: String,
    default: "pending",
    enum: ["pending", "verified", "rejected"],
  },
  declineReason: {
    type: String,
    default:
      "Your registration did not meet the event criteria. Please review the requirements and try again",
  },
  spouse: { type: spouseSchema, default: null },
  hasSpouseOrFamily: { type: Boolean, default: false },
  familyCount: { type: Number, default: 0, max: 2 },

  receipt: {
    type: String,
    default: "",
  },
  membership: {
    type: String,
    enum: [
      "Jhapali Samaj USA",
      "International Jhapali Samaj",
      "Other"
    ],
  },
  otherAffiliation: {
    type: String,
    default: "",
  },

});

const attendeePageSchema = new mongoose.Schema(
  {
    pageTitle: { type: String, default: "Register For The Event" },
    pageSubtitle: { type: String, default: "" },
    eventStatus: { type: Boolean, default: true },
    eventDate: { type: Date, default: "" },
    eventAddress: { type: String, default: "" },
    eventVenue: { type: String, default: "" },
    eventDescription: { type: String, default: "" },
    buttonText: { type: String, default: "Register Now" },
    attendees: [attendeeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AttendeePage", attendeePageSchema);
