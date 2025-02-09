const mongoose = require('mongoose');

const committeeMemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    designation: {
        type: String,
        required: true
    },
}, { _id: true });

const executiveCommitteePageSchema = new mongoose.Schema(
    {
        pageTitle: {
            type: String,
            required: true,
            default: "National Executive Committee"
        },
        pageDescription: {
            type: String,
            default: ""
        },
        committeeMembers: [committeeMemberSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("ExecutiveCommitteePage", executiveCommitteePageSchema);
