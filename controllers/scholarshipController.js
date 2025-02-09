const ScholarshipPage = require("../models/scholarshipPage");
const createUploader = require("../middleware/uploader");

// Create an uploader for the scholarship page (QR codes will be stored under /uploads/scholarship)
const scholarshipUploader = createUploader("scholarship");

// Middleware to handle multiple QR code file uploads.
exports.uploadScholarshipQRMiddleware = (req, res, next) => {
    const upload = scholarshipUploader.fields([
        { name: "donationCheckQR", maxCount: 1 },
        { name: "donationZelleQR", maxCount: 1 },
        { name: "donationPaypalQR", maxCount: 1 },
        { name: "donationEsewaQR", maxCount: 1 },
        { name: "donationKhaltiQR", maxCount: 1 },
        { name: "donationBankQR", maxCount: 1 }
    ]);
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

/**
 * GET /api/scholarships
 * Retrieve the Scholarship page details.
 */
exports.getScholarshipPage = async (req, res) => {
    try {
        let page = await ScholarshipPage.findOne();
        if (!page) {
            // If no document exists, create one with default values.
            page = new ScholarshipPage();
            await page.save();
        }
        return res.status(200).json(page);
    } catch (error) {
        console.error("getScholarshipPage Error:", error);
        return res
            .status(500)
            .json({ error: "Server error fetching scholarship page." });
    }
};

/**
 * PUT /api/scholarships
 * Admin-only endpoint: Update the Scholarship page details,
 * including text fields and QR code images.
 * Accepts multipart/form-data.
 * For text fields, use JSON string or normal form-data fields.
 */
exports.updateScholarshipPage = async (req, res) => {
    try {
        const {
            pageTitle,
            pageDescription,
            donationCheck,
            donationZelle,
            donationPaypal,
            donationEsewa,
            donationKhalti,
            donationBank,
        } = req.body;

        let page = await ScholarshipPage.findOne();
        if (!page) {
            page = new ScholarshipPage();
        }

        if (pageTitle !== undefined) page.pageTitle = pageTitle;
        if (pageDescription !== undefined) page.pageDescription = pageDescription;

        if (donationCheck !== undefined) {
            const parsedDonationCheck = typeof donationCheck === "string" ? JSON.parse(donationCheck) : donationCheck;
            page.donationCheck = {
                instructions: parsedDonationCheck.instructions || page.donationCheck.instructions,
                annualDonation: parsedDonationCheck.annualDonation || page.donationCheck.annualDonation,
                onetimeDonation: parsedDonationCheck.onetimeDonation || page.donationCheck.onetimeDonation,
                address: parsedDonationCheck.address || page.donationCheck.address,
                qrImage: page.donationCheck.qrImage
            };
        }
        if (donationZelle !== undefined) {
            const parsedDonationZelle = typeof donationZelle === "string" ? JSON.parse(donationZelle) : donationZelle;
            page.donationZelle = {
                instructions: parsedDonationZelle.instructions || page.donationZelle.instructions,
                email: parsedDonationZelle.email || page.donationZelle.email,
                method: parsedDonationZelle.method || page.donationZelle.method,
                qrImage: page.donationZelle.qrImage
            };
        }
        if (donationPaypal !== undefined) {
            const parsedDonationPaypal = typeof donationPaypal === "string" ? JSON.parse(donationPaypal) : donationPaypal;
            page.donationPaypal = {
                instructions: parsedDonationPaypal.instructions || page.donationPaypal.instructions,
                fee: parsedDonationPaypal.fee || page.donationPaypal.fee,
                note: parsedDonationPaypal.note || page.donationPaypal.note,
                link: parsedDonationPaypal.link || page.donationPaypal.link,
                qrImage: page.donationPaypal.qrImage
            };
        }
        if (donationEsewa !== undefined) {
            const parsedDonationEsewa = typeof donationEsewa === "string" ? JSON.parse(donationEsewa) : donationEsewa;
            page.donationEsewa = {
                instructions: parsedDonationEsewa.instructions || page.donationEsewa.instructions,
                name: parsedDonationEsewa.name || page.donationEsewa.name,
                number: parsedDonationEsewa.number || page.donationEsewa.number,
                qrImage: page.donationEsewa.qrImage
            };
        }
        if (donationKhalti !== undefined) {
            const parsedDonationKhalti = typeof donationKhalti === "string" ? JSON.parse(donationKhalti) : donationKhalti;
            page.donationKhalti = {
                instructions: parsedDonationKhalti.instructions || page.donationKhalti.instructions,
                name: parsedDonationKhalti.name || page.donationKhalti.name,
                number: parsedDonationKhalti.number || page.donationKhalti.number,
                qrImage: page.donationKhalti.qrImage
            };
        }
        if (donationBank !== undefined) {
            const parsedDonationBank = typeof donationBank === "string" ? JSON.parse(donationBank) : donationBank;
            page.donationBank = {
                instructions: parsedDonationBank.instructions || page.donationBank.instructions,
                accountName: parsedDonationBank.accountName || page.donationBank.accountName,
                accountNumber: parsedDonationBank.accountNumber || page.donationBank.accountNumber,
                qrImage: page.donationBank.qrImage
            };
        }

        // Process uploaded files (if any)
        if (req.files) {
            if (req.files.donationCheckQR && req.files.donationCheckQR[0]) {
                page.donationCheck.qrImage = req.files.donationCheckQR[0].path;
            }
            if (req.files.donationZelleQR && req.files.donationZelleQR[0]) {
                page.donationZelle.qrImage = req.files.donationZelleQR[0].path;
            }
            if (req.files.donationPaypalQR && req.files.donationPaypalQR[0]) {
                page.donationPaypal.qrImage = req.files.donationPaypalQR[0].path;
            }
            if (req.files.donationEsewaQR && req.files.donationEsewaQR[0]) {
                page.donationEsewa.qrImage = req.files.donationEsewaQR[0].path;
            }
            if (req.files.donationKhaltiQR && req.files.donationKhaltiQR[0]) {
                page.donationKhalti.qrImage = req.files.donationKhaltiQR[0].path;
            }
            if (req.files.donationBankQR && req.files.donationBankQR[0]) {
                page.donationBank.qrImage = req.files.donationBankQR[0].path;
            }
        }

        await page.save();
        return res.status(200).json({
            message: "Scholarship page updated successfully.",
            page,
        });
    } catch (error) {
        console.error("updateScholarshipPage Error:", error);
        return res
            .status(500)
            .json({ error: "Server error updating scholarship page." });
    }
};