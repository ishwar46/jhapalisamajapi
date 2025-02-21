const ImpactSummaryPage = require("../models/impactSummary");

/**
 * GET /api/impactSummary
 * Public: Returns the ImpactSummaryPage document (pageTitle, pageContent, highLightedText, buttonText, number1, number1Text, number2, number2Text, number3, number3Text)
 */
exports.getImpactSummaryPage = async (req, res) => {
  try {
    let page = await ImpactSummaryPage.findOne();
    if (!page) {
      page = new ImpactSummaryPage();
      await page.save();
    }
    return res.status(200).json(page);
  } catch (error) {
    console.error("get Impact Summary Error:", error);
    return res
      .status(500)
      .json({ error: "Server error fetching impact summary page." });
  }
};

/**
 * POST /api/impact-summary
 * Admin Only: Update page-level info (pageTitle, pageContent, highLightedText, buttonText, number1, number1Text, number2, number2Text, number3, number3Text)
 */
exports.updateImpactSummaryPage = async (req, res) => {
  try {
    const {
      pageTitle,
      pageContent,
      highLightedText,
      buttonText,
      number1,
      number1Text,
      number2,
      number2Text,
      number3,
      number3Text,
    } = req.body;
    let page = await ImpactSummaryPage.findOne();

    if (!page) {
      page = new ImpactSummaryPage();
    }
    if (pageTitle !== undefined) page.pageTitle = pageTitle;
    if (pageContent !== undefined) page.pageContent = pageContent;
    if (highLightedText !== undefined) page.highLightedText = highLightedText;
    if (buttonText !== undefined) page.buttonText = buttonText;
    if (number1 !== undefined) page.number1 = number1;
    if (number1Text !== undefined) page.number1Text = number1Text;
    if (number2 !== undefined) page.number2 = number2;
    if (number2Text !== undefined) page.number2Text = number2Text;
    if (number3 !== undefined) page.number3 = number3;
    if (number3Text !== undefined) page.number3Text = number3Text;

    await page.save();
    return res.status(200).json({
      message: "Impact Summary updated successfully.",
      page,
    });
  } catch (error) {
    console.error("Update Impact Summary Error:", error);
    return res
      .status(500)
      .json({ error: "Server error updating impact summary item." });
  }
};
