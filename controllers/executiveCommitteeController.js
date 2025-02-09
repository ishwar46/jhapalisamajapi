const ExecutiveCommitteePage = require("../models/executiveCommitteePage");

/**
 * GET /api/executive-committee
 * Public endpoint to retrieve the Executive Committee page details,
 * including populated committee member information.
 */
exports.getExecutiveCommitteePage = async (req, res) => {
    try {
        let page = await ExecutiveCommitteePage.findOne().populate("committeeMembers.user", "fullName email profilePicture");
        if (!page) {
            // Create a default page if it doesn't exist
            page = new ExecutiveCommitteePage({
                pageTitle: "National Executive Committee",
                pageDescription: "Meet our distinguished leadership team."
            });
            await page.save();
            page = await ExecutiveCommitteePage.findOne().populate("committeeMembers.user", "fullName email profilePicture");
        }
        return res.status(200).json(page);
    } catch (error) {
        console.error("getExecutiveCommitteePage Error:", error);
        return res.status(500).json({ error: "Server error fetching executive committee page." });
    }
};

/**
 * PUT /api/executive-committee
 * Admin-only endpoint: Update the page-level information.
 * Expected JSON body: { pageTitle, pageDescription }
 */
exports.updateExecutiveCommitteePage = async (req, res) => {
    try {
        const { pageTitle, pageDescription } = req.body;
        let page = await ExecutiveCommitteePage.findOne();
        if (!page) {
            page = new ExecutiveCommitteePage();
        }
        if (pageTitle !== undefined) page.pageTitle = pageTitle;
        if (pageDescription !== undefined) page.pageDescription = pageDescription;
        await page.save();
        return res.status(200).json({
            message: "Executive committee page updated successfully.",
            page,
        });
    } catch (error) {
        console.error("updateExecutiveCommitteePage Error:", error);
        return res.status(500).json({ error: "Server error updating executive committee page." });
    }
};

/**
 * POST /api/executive-committee/items
 * Admin-only endpoint: Add a new committee member.
 * Expected JSON body:
 * {
 *   "user": "<User ObjectId>",
 *   "designation": "President"
 * }
 */
exports.addCommitteeMember = async (req, res) => {
    try {
        const { user, designation } = req.body;
        if (!user || !designation) {
            return res.status(400).json({ error: "User and designation are required." });
        }
        let page = await ExecutiveCommitteePage.findOne();
        if (!page) {
            page = new ExecutiveCommitteePage();
            await page.save();
        }
        page.committeeMembers.push({ user, designation });
        await page.save();
        page = await ExecutiveCommitteePage.findOne().populate("committeeMembers.user", "fullName email profilePicture");
        return res.status(201).json({
            message: "Committee member added successfully.",
            page,
        });
    } catch (error) {
        console.error("addCommitteeMember Error:", error);
        return res.status(500).json({ error: "Server error adding committee member." });
    }
};

/**
 * PATCH /api/executive-committee/items/:memberId
 * Admin-only endpoint: Update an existing committee member.
 * Expected JSON body: any of { user, designation }
 */
exports.updateCommitteeMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { user, designation } = req.body;
        let page = await ExecutiveCommitteePage.findOne();
        if (!page) {
            return res.status(404).json({ error: "Executive committee page not found." });
        }
        const member = page.committeeMembers.id(memberId);
        if (!member) {
            return res.status(404).json({ error: "Committee member not found." });
        }
        if (user !== undefined) member.user = user;
        if (designation !== undefined) member.designation = designation;
        await page.save();
        page = await ExecutiveCommitteePage.findOne().populate("committeeMembers.user", "fullName email profilePicture");
        return res.status(200).json({
            message: "Committee member updated successfully.",
            page,
        });
    } catch (error) {
        console.error("updateCommitteeMember Error:", error);
        return res.status(500).json({ error: "Server error updating committee member." });
    }
};

/**
 * DELETE /api/executive-committee/items/:memberId
 * Admin-only endpoint: Delete a committee member.
 */
exports.deleteCommitteeMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        let page = await ExecutiveCommitteePage.findOne();
        if (!page) {
            return res.status(404).json({ error: "Executive committee page not found." });
        }
        const member = page.committeeMembers.id(memberId);
        if (!member) {
            return res.status(404).json({ error: "Committee member not found." });
        }
        page.committeeMembers.pull(memberId);
        await page.save();
        page = await ExecutiveCommitteePage.findOne().populate("committeeMembers.user", "fullName email profilePicture");
        return res.status(200).json({
            message: "Committee member deleted successfully.",
            page,
        });
    } catch (error) {
        console.error("deleteCommitteeMember Error:", error);
        return res.status(500).json({ error: "Server error deleting committee member." });
    }
};
