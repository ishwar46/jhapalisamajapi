const HeroSlide = require("../models/heroSlide");
const createUploader = require("../middleware/uploader");

// Multer instance: storing images under /uploads/heroSlides
const heroSlideUploader = createUploader("heroSlides").single("heroImage");

// This middleware will handle the file upload before we create/update the slide
exports.uploadSlideImageMiddleware = (req, res, next) => {
  heroSlideUploader(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

/**
 * GET /api/hero-slides
 * Public endpoint: returns all slides in the order you want
 */
exports.getAllSlides = async (req, res) => {
  try {
    // Sort by 'order' ascending or by created date, depends on your preference
    const slides = await HeroSlide.find().sort({ order: 1 });
    return res.status(200).json(slides);
  } catch (error) {
    console.error("getAllSlides Error:", error);
    return res.status(500).json({ error: "Server error fetching slides." });
  }
};

/**
 * POST /api/hero-slides
 * Admin or superadmin only, form-data with fields:
 *   title, subtitle, description, order (optional), heroImage (file)
 */
exports.createSlide = async (req, res) => {
  try {
    const { title, subtitle, description, order } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    // If an image was uploaded, it will be at req.file
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    }

    const newSlide = new HeroSlide({
      title,
      subtitle,
      description,
      image: imageName,
      order: order || 0,
    });

    await newSlide.save();
    return res.status(201).json({
      message: "Hero slide created successfully.",
      slide: newSlide,
    });
  } catch (error) {
    console.error("createSlide Error:", error);
    return res.status(500).json({ error: "Server error creating slide." });
  }
};

/**
 * PATCH /api/hero-slides/:id
 * Admin or superadmin only, form-data can have fields:
 *   title, subtitle, description, order, heroImage(file)
 */
exports.updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, order } = req.body;

    const slide = await HeroSlide.findById(id);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found." });
    }

    if (title !== undefined) slide.title = title;
    if (subtitle !== undefined) slide.subtitle = subtitle;
    if (description !== undefined) slide.description = description;
    if (order !== undefined) slide.order = order;

    if (req.file) {
      // If a new image is uploaded, set the slide.image to the new file path
      slide.image = req.file.filename;
    }

    await slide.save();
    return res.status(200).json({
      message: "Hero slide updated successfully.",
      slide,
    });
  } catch (error) {
    console.error("updateSlide Error:", error);
    return res.status(500).json({ error: "Server error updating slide." });
  }
};

/**
 * DELETE /api/hero-slides/:id
 * Admin or superadmin only: delete a slide
 */
exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findByIdAndDelete(id);

    if (!slide) {
      return res
        .status(404)
        .json({ error: "Slide not found or already deleted." });
    }

    return res
      .status(200)
      .json({ message: "Hero slide deleted successfully." });
  } catch (error) {
    console.error("deleteSlide Error:", error);
    return res.status(500).json({ error: "Server error deleting slide." });
  }
};
