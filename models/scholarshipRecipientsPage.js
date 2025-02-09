const mongoose = require("mongoose");

const scholarshipRecipientSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    image: { type: String, default: "" },
    district: { type: String, default: "" },
    school: { type: String, default: "" },
    grade: { type: String, default: "" },
    address: { type: String, default: "" },
    // If the contributor is a registered user, store a reference:
    contributor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // manually provide a contributor name:
    contributorName: { type: String, default: "" }
});

const scholarshipRecipientsPageSchema = new mongoose.Schema(
    {
        pageTitle: { type: String, required: true, default: "Scholarship Recipients" },
        pageDescription: { type: String, default: "" },
        recipients: [scholarshipRecipientSchema]
    },
    { timestamps: true }
);

module.exports = mongoose.model("ScholarshipRecipientsPage", scholarshipRecipientsPageSchema);
