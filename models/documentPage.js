const mongoose = require("mongoose");

const documentItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const documentPageSchema = new mongoose.Schema(
    {
        pageTitle: { type: String, required: true, default: "Documents" },
        pageDescription: { type: String, default: "" },
        documents: [documentItemSchema]
    },
    { timestamps: true }
);

module.exports = mongoose.model("DocumentPage", documentPageSchema);
