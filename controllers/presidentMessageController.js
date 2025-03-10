const PresidentMessagePage = require("../models/presidentsMessage");
const createUploader = require("../middleware/uploader");
const sizeOf = require("image-size");
const path = require("path");

// Multer instance for "president" images, storing under /uploads/president
const presidentUploader = createUploader("president").single("presidentImage");

exports.uploadPresidentImageMiddleware = (req, res, next) => {
  presidentUploader(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

/**
 * GET /api/president-message
 * Public: Returns the PresidentMessagePage document (pageTitle, paragraph, presidentTitle, closingSalutation)
 */
exports.getPresidentMessage = async (req, res) => {
  try {
    let page = await PresidentMessagePage.findOne();
    if (!page) {
      page = new PresidentMessagePage();
      await page.save();
    }
    return res.status(200).json(page);
  } catch (error) {
    console.error("Get President Message Error:", error);
    return res
      .status(500)
      .json({ error: "Server error fetching president message page." });
  }
};

/**
 * POST /api/president-message
 * Admin Only: Update page-level info (pageTitle, paragraph, presidentTitle, closingSalutation)
 */
exports.updatePresidentMessage = async (req, res) => {
  try {
    const { pageTitle, paragraph, presidentTitle, closingSalutation } =
      req.body;
    let page = await PresidentMessagePage.findOne();

    if (!page) {
      page = new PresidentMessagePage();
    }
    if (pageTitle !== undefined) page.pageTitle = pageTitle;
    if (paragraph !== undefined) page.paragraph = paragraph;
    if (presidentTitle !== undefined) page.presidentTitle = presidentTitle;
    if (closingSalutation !== undefined)
      page.closingSalutation = closingSalutation;
    if (req.file) {
      page.presidentImage = path.basename(req.file.path);
    }
    await page.save();
    return res.status(200).json({
      message: "President Message updated successfully.",
      page,
    });
  } catch (error) {
    console.error("Update President Message Error:", error);
    return res
      .status(500)
      .json({ error: "Server error updating president message item." });
  }
};
