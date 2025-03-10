const mongoose = require("mongoose");

const presidentMessageSchema = new mongoose.Schema(
  {
    presidentImage: { type: String },
    pageTitle: { type: String, default: "President's Message" },
    presidentTitle: { type: String },
    paragraph: [{ type: String, required: true }],
    closingSalutation: { type: String, default: "Sincerely" },
    presidentImage: { type: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("PresidentMessage", presidentMessageSchema);
