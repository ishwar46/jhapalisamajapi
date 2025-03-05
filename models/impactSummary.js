const mongoose = require("mongoose");

const impactSummarySchema = new mongoose.Schema(
  {
    pageTitle: { type: String, default: "Impact Summary" },
    pageContent: { type: String, default: "" },
    highLightedText: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    number1: { type: Number, default: "" },
    number1Text: { type: String, default: "" },
    number2: { type: Number, default: "" },
    number2Text: { type: String, default: "" },
    number3: { type: Number, default: "" },
    number3Text: { type: String, default: "" },
  },

  { timestamps: true }
);

module.exports = mongoose.model("ImpactSummaryPage", impactSummarySchema);
