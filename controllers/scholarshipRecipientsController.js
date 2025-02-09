const ScholarshipRecipientsPage = require("../models/scholarshipRecipientsPage");
const createUploader = require("../middleware/uploader");
const recipientUploader = createUploader("recipients").single("recipientImage");

/**
 * Middleware to handle recipient image upload.
 * Expects a form-data field named "recipientImage"
 */
exports.uploadRecipientImageMiddleware = (req, res, next) => {
    recipientUploader(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

/**
 * GET /api/scholarship-recipients
 * Public endpoint: Retrieve the Scholarship Recipients page details.
 */
exports.getScholarshipRecipientsPage = async (req, res) => {
    try {
        let page = await ScholarshipRecipientsPage.findOne();
        if (!page) {
            // Create a default document if none exists
            page = new ScholarshipRecipientsPage({
                pageTitle: "Scholarship Recipients",
                pageDescription: "Discover the students receiving support through our scholarship program."
            });
            await page.save();
        }
        return res.status(200).json(page);
    } catch (error) {
        console.error("getScholarshipRecipientsPage Error:", error);
        return res.status(500).json({ error: "Server error fetching scholarship recipients page." });
    }
};

/**
 * PUT /api/scholarship-recipients
 * Admin-only endpoint: Update the page-level info (pageTitle, pageDescription).
 */
exports.updateScholarshipRecipientsPage = async (req, res) => {
    try {
        const { pageTitle, pageDescription } = req.body;
        let page = await ScholarshipRecipientsPage.findOne();
        if (!page) {
            page = new ScholarshipRecipientsPage();
        }
        if (pageTitle !== undefined) page.pageTitle = pageTitle;
        if (pageDescription !== undefined) page.pageDescription = pageDescription;
        await page.save();
        return res.status(200).json({
            message: "Scholarship recipients page updated successfully.",
            page,
        });
    } catch (error) {
        console.error("updateScholarshipRecipientsPage Error:", error);
        return res.status(500).json({ error: "Server error updating scholarship recipients page." });
    }
};

/**
 * POST /api/scholarship-recipients/items
 * Admin-only endpoint: Add a new scholarship recipient.
 * Expected form-data:
 *   - Text fields: studentName, district, school, grade, address, contributorName (optional)
 *   - Optionally, contributor (the user _id) if the contributor is a registered user.
 *   - File field: recipientImage (optional)
 */
exports.addRecipientItem = async (req, res) => {
    try {
        const { studentName, district, school, grade, address, contributor, contributorName } = req.body;
        if (!studentName) {
            return res.status(400).json({ error: "Student name is required." });
        }

        let page = await ScholarshipRecipientsPage.findOne();
        if (!page) {
            page = new ScholarshipRecipientsPage();
            await page.save();
        }

        let imagePath = "";
        if (req.file) {
            imagePath = req.file.path;
        }

        page.recipients.push({
            studentName,
            image: imagePath,
            district: district || "",
            school: school || "",
            grade: grade || "",
            address: address || "",
            contributor: contributor || undefined,
            contributorName: contributorName || "",
        });

        await page.save();
        return res.status(201).json({
            message: "Scholarship recipient added successfully.",
            page,
        });
    } catch (error) {
        console.error("addRecipientItem Error:", error);
        return res.status(500).json({ error: "Server error adding scholarship recipient." });
    }
};

/**
 * PATCH /api/scholarship-recipients/items/:recipientId
 * Admin-only endpoint: Update a specific scholarship recipient.
 * Accepts form-data with text fields and optionally a new file for recipientImage.
 */
exports.updateRecipientItem = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const { studentName, district, school, grade, address, contributor, contributorName } = req.body;

        let page = await ScholarshipRecipientsPage.findOne();
        if (!page) {
            return res.status(404).json({ error: "Scholarship recipients page not found." });
        }

        const recipient = page.recipients.id(recipientId);
        if (!recipient) {
            return res.status(404).json({ error: "Recipient not found." });
        }

        if (studentName !== undefined) recipient.studentName = studentName;
        if (district !== undefined) recipient.district = district;
        if (school !== undefined) recipient.school = school;
        if (grade !== undefined) recipient.grade = grade;
        if (address !== undefined) recipient.address = address;
        if (contributor !== undefined) recipient.contributor = contributor;
        if (contributorName !== undefined) recipient.contributorName = contributorName;

        if (req.file) {
            recipient.image = req.file.path;
        }

        await page.save();
        return res.status(200).json({
            message: "Scholarship recipient updated successfully.",
            page,
        });
    } catch (error) {
        console.error("updateRecipientItem Error:", error);
        return res.status(500).json({ error: "Server error updating scholarship recipient." });
    }
};

/**
 * DELETE /api/scholarship-recipients/items/:recipientId
 * Admin-only endpoint: Delete a scholarship recipient from the page.
 */
exports.deleteRecipientItem = async (req, res) => {
    try {
        const { recipientId } = req.params;
        let page = await ScholarshipRecipientsPage.findOne();
        if (!page) {
            return res.status(404).json({ error: "Scholarship recipients page not found." });
        }
        const recipient = page.recipients.id(recipientId);
        if (!recipient) {
            return res.status(404).json({ error: "Recipient not found." });
        }
        page.recipients.pull(recipientId);
        await page.save();
        return res.status(200).json({
            message: "Scholarship recipient deleted successfully.",
            page,
        });
    } catch (error) {
        console.error("deleteRecipientItem Error:", error);
        return res.status(500).json({ error: "Server error deleting scholarship recipient." });
    }
};
