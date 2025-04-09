const AttendeePage = require("../models/AttendeePage");
const { sendEmail } = require("../middleware/nodeMailer");
const {
  attendeeRegistrationEmail,
  attendeeAcceptEmail,
  attendeeDeclineEmail,
} = require("../utils/emailTemplates");
const createUploader = require("../middleware/uploader");
const path = require("path");

// Multer instance for blog images
const attendeeUploader = createUploader("attendeeReceipts").single("receipt");

// Middleware wrapper for file uploads
exports.uploadAttendeeReceiptMiddleware = (req, res, next) => {
  attendeeUploader(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};
/**
 * GET /api/attendee-page
 * Public endpoint: Retrieve the Attendee page details,
 * including the attendees array and total donated amount.
 */
exports.getAttendeePage = async (req, res) => {
  try {
    let page = await AttendeePage.findOne();
    if (!page) {
      page = new AttendeePage();
      await page.save();
    }
    return res.status(200).json({
      message: "Attendee page fetched successfully.",
      pageTitle: page.pageTitle,
      pageSubtitle: page.pageSubtitle,
      eventDate: page.eventDate,
      eventTime: page.eventTime,
      eventStatus: page.eventStatus,
      eventAddress: page.eventAddress,
      eventVenue: page.eventVenue,
      eventDescription: page.eventDescription,
      buttonText: page.buttonText,
    });
  } catch (error) {
    console.error("getAttendeePage Error:", error);
    return res
      .status(500)
      .json({ error: "Server error fetching attendee page." });
  }
};

/**
 * GET /api/attendee-page/attendees
 * Public endpoint: Retrieve the Attendee details,
 * including the attendees array and total donated amount.
 */
exports.getAllAttendees = async (req, res) => {
  try {
    let page = await AttendeePage.findOne();
    if (!page) {
      page = new AttendeePage();
      await page.save();
    }
    return res.status(200).json(page);
  } catch (error) {
    console.error("getAttendeePage Error:", error);
    return res
      .status(500)
      .json({ error: "Server error fetching attendee page." });
  }
};

/**
 * PUT /api/attendee-page
 * Admin-only endpoint: Update the page-level info (pageTitle, pageSubtitle).
 * Expected JSON body: { pageTitle, pageSubtitle }
 */
exports.updateAttendeePage = async (req, res) => {
  try {
    const {
      pageTitle,
      pageSubtitle,
      eventDate,
      eventTime,
      eventStatus,
      eventAddress,
      eventVenue,
      eventDescription,
      buttonText,
    } = req.body;
    let page = await AttendeePage.findOne();
    if (!page) {
      page = new AttendeePage();
    }
    if (pageTitle !== undefined) page.pageTitle = pageTitle;
    if (pageSubtitle !== undefined) page.pageSubtitle = pageSubtitle;
    if (eventDate !== undefined) page.eventDate = eventDate;
    if (eventTime !== undefined) page.eventTime = eventTime;
    if (eventVenue !== undefined) page.eventVenue = eventVenue;
    if (eventDescription !== undefined)
      page.eventDescription = eventDescription;
    if (eventStatus !== undefined) page.eventStatus = eventStatus;
    if (eventAddress !== undefined) page.eventAddress = eventAddress;
    if (buttonText !== undefined) page.buttonText = buttonText;

    await page.save();
    return res.status(200).json({
      message: "Attendee page updated successfully.",
      page,
    });
  } catch (error) {
    console.error("updateAttendeePage Error:", error);
    return res
      .status(500)
      .json({ error: "Server error updating attendee page." });
  }
};

/**
 * POST /api/attendee-page/attendees
 * Admin-only endpoint: Add a new attendee.
 * Expected JSON body:
 * {
 *   "fullName": "Ram Bahadur",
 *   "email": ram@domain.com,
 *   "country": "Nepal",
 *   "spouse": {
 *     "fullName": "Sita Bahadur",
 *     "contact": 97918231231,
 *     "country": "Nepal"
 * }
 * }
 */
exports.attendeeRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      country,
      contact,
      spouse,
      membership,
      designation,
      otherAffiliation,
      hasSpouseOrFamily,
      familyCount,
    } = req.body;

    if (!fullName || !email || !contact || !membership) {
      return res.status(400).json({
        error: "fullName, email, contact, and membership are required.",
      });
    }

    const familyCountNum = parseInt(familyCount || 0);
    if (familyCountNum > 2) {
      return res.status(400).json({
        error: "Family count cannot exceed 2.",
      });
    }

    let page = await AttendeePage.findOne();
    if (!page) {
      page = new AttendeePage();
      await page.save();
    }

    let receipt = "";
    if (req.file) {
      receipt = req.file.filename;
    }

    const attendeeData = {
      fullName,
      email,
      country,
      designation,
      contact,
      receipt,
      membership,
      otherAffiliation: membership === "Other" ? otherAffiliation : "",
      hasSpouseOrFamily:
        hasSpouseOrFamily === "true" || hasSpouseOrFamily === true,
      familyCount: familyCountNum,
      spouse: spouse ? JSON.parse(spouse) : null,
    };

    page.attendees.push(attendeeData);
    await page.save();

    await sendEmail({
      from: "jhapalisamaj@gmail.com",
      to: email,
      subject: "Registration Successful",
      html: attendeeRegistrationEmail(fullName),
    });

    return res.status(201).json({
      message:
        "Registration completed successfully. Please check your email inbox or spam folder for further instructions.",
      page,
    });
  } catch (error) {
    console.error("registerAttendee Error:", error);
    return res
      .status(500)
      .json({ error: "Server error registering attendee." });
  }
};

/**
 * PATCH /api/attendee-page/attendees/:attendeeId
 * Admin-only endpoint: Update an existing attendee.
 * Expected JSON body: any of { fullName, email, country, spouse }
 */
exports.verifyAttendee = async (req, res) => {
  try {
    const { attendeeId } = req.params;
    const { verificationStatus, declineReason } = req.body;
    let page = await AttendeePage.findOne();
    if (!page) {
      return res.status(404).json({ error: "Attendee page not found." });
    }
    const attendees = page.attendees.id(attendeeId);
    if (!attendees) {
      return res.status(404).json({ error: "Attendee not found." });
    }
    if (verificationStatus !== undefined)
      attendees.verificationStatus = verificationStatus;
    if (declineReason !== undefined) attendees.declineReason = declineReason;
    if (verificationStatus === "verified") {
      const eventDate = page.eventDate;
      const eventTime = page.eventTime;
      const eventVenue = page.eventVenue;
      const eventAddress = page.eventAddress;

      const eventDescription = page.eventDescription;
      attendees.declineReason = undefined;
      await sendEmail({
        from: "jhapalisamaj@gmail.com",
        to: attendees.email,
        subject: "Successfully Verified!",
        html: attendeeAcceptEmail(attendees.fullName, attendeeId),
      });
    } else {
      await sendEmail({
        from: "jhapalisamaj@gmail.com",
        to: attendees.email,
        subject: "Application Rejected",
        html: attendeeDeclineEmail(
          attendees.fullName,
          declineReason ||
            "Your registration did not meet the event criteria. Please review the requirements and try again"
        ),
      });
    }
    await page.save();
    return res.status(200).json({
      message: "Attendee updated successfully.",
      page,
    });
  } catch (error) {
    console.error("updateAttendee Error:", error);
    return res.status(500).json({ error: "Server error updating attendee." });
  }
};
/**
 * PATCH /api/attendee-page/attendees/:attendeeId
 * Admin-only endpoint: Update an existing attendee.
 * Expected JSON body: any of { fullName, email, country, spouse }
 */
exports.updateAttendee = async (req, res) => {
  try {
    const { attendeeId } = req.params;
    const {
      fullName,
      email,
      country,
      designation,
      contact,
      spouse,
      membership,
      otherAffiliation,
      hasSpouseOrFamily,
      familyCount,
    } = req.body;
    console.log(req.body, "this is req body data");
    let page = await AttendeePage.findOne();
    if (!page) {
      return res.status(404).json({ error: "Attendee page not found." });
    }
    const attendees = page.attendees.id(attendeeId);
    if (!attendees) {
      return res.status(404).json({ error: "Attendee not found." });
    }

    if (req.file) {
      attendees.receipt = req.file.filename;
    }
    if (fullName !== undefined) attendees.fullName = fullName;
    if (email !== undefined) attendees.email = email;
    if (country !== undefined) attendees.country = country;
    if (designation !== undefined) attendees.designation = designation;
    if (contact !== undefined) attendees.contact = contact;
    if (spouse !== undefined) attendees.spouse = spouse;
    if (membership !== undefined) attendees.membership = membership;
    if (otherAffiliation !== undefined)
      attendees.otherAffiliation = otherAffiliation;
    if (hasSpouseOrFamily !== undefined)
      attendees.hasSpouseOrFamily = hasSpouseOrFamily;
    if (familyCount !== undefined) attendees.familyCount = familyCount;

    await page.save();
    return res.status(200).json({
      message: "Attendee updated successfully.",
      page,
    });
  } catch (error) {
    console.error("updateAttendee Error:", error);
    return res.status(500).json({ error: "Server error updating attendee." });
  }
};

/**
 * DELETE /api/attendee-page/attendees/:attendeeId
 * Admin-only endpoint: Delete a attendee.
 */
exports.deleteAttendee = async (req, res) => {
  try {
    const { attendeeId } = req.params;
    let page = await AttendeePage.findOne();
    if (!page) {
      return res.status(404).json({ error: "Attendee page not found." });
    }
    const attendees = page.attendees.id(attendeeId);
    if (!attendees) {
      return res.status(404).json({ error: "Attendee not found." });
    }
    page.attendees.pull(attendeeId);
    await page.save();
    return res.status(200).json({
      message: "Attendee deleted successfully.",
      page,
    });
  } catch (error) {
    console.error("deleteAttendee Error:", error);
    return res.status(500).json({ error: "Server error deleting attendee." });
  }
};
