const BlogPage = require("../models/Blog");
const createUploader = require("../middleware/uploader");

// Multer instance for blog images
const blogUploader = createUploader("blogs").single("blogImage");

// Middleware wrapper for file uploads
exports.uploadBlogImageMiddleware = (req, res, next) => {
  blogUploader(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

/**
 * GET /api/blogs
 * Public: Returns the BlogPage document (pageTitle, pageSubtitle, blogs array)
 */
exports.getBlogPage = async (req, res) => {
  try {
    let page = await BlogPage.findOne();
    if (!page) {
      page = new BlogPage();
      await page.save();
    }
    return res.status(200).json(page);
  } catch (error) {
    console.error("getBlogPage Error:", error);
    return res.status(500).json({ error: "Server error fetching blog page." });
  }
};

/**
 * POST /api/blogs
 * Admin Only: Update page-level info (pageTitle, pageSubtitle)
 */
exports.updateBlogPage = async (req, res) => {
  try {
    const { pageTitle, pageSubtitle } = req.body;
    let page = await BlogPage.findOne();
    if (!page) {
      page = new BlogPage();
    }
    if (pageTitle !== undefined) page.pageTitle = pageTitle;
    if (pageSubtitle !== undefined) page.pageSubtitle = pageSubtitle;
    await page.save();
    return res.status(200).json({
      message: "Blog page updated successfully.",
      page,
    });
  } catch (error) {
    console.error("updateBlogPage Error:", error);
    return res.status(500).json({ error: "Server error updating blog page." });
  }
};

/**
 * POST /api/blogs/items
 * Admin Only: Add a new blog item
 * Expects form-data with fields: title, description, fullContent, and file field "blogImage"
 */
exports.addBlogItem = async (req, res) => {
  try {
    const { title, description, fullContent, postedBy } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    let page = await BlogPage.findOne();
    if (!page) {
      page = new BlogPage();
      await page.save();
    }

    let imagePath = "";
    let imageName = "";
    if (req.file) {
      imagePath = req.file.path;
      imageName = req.file.filename;
    }

    page.blogs.push({
      title,
      image: imageName,
      description: description || "",
      fullContent: fullContent || "",
      postedBy: postedBy || "Admin",
    });

    await page.save();
    return res.status(201).json({
      message: "Blog item added successfully.",
      page,
    });
  } catch (error) {
    console.error("addBlogItem Error:", error);
    return res.status(500).json({ error: "Server error adding blog item." });
  }
};

/**
 * PATCH /api/blogs/items/:blogId
 * Admin Only: Update an existing blog item.
 * Expects form-data (if uploading a new image) and JSON fields for updates.
 */
exports.updateBlogItem = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description, fullContent, postedBy } = req.body;

    let page = await BlogPage.findOne();
    if (!page) {
      return res.status(404).json({ error: "Blog page not found." });
    }

    const item = page.blogs.id(blogId);
    if (!item) {
      return res.status(404).json({ error: "Blog item not found." });
    }

    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description;
    if (fullContent !== undefined) item.fullContent = fullContent;
    if (postedBy !== undefined) item.postedBy = postedBy;

    if (req.file) {
      item.image = req.file.path;
    }

    await page.save();
    return res.status(200).json({
      message: "Blog item updated successfully.",
      page,
    });
  } catch (error) {
    console.error("updateBlogItem Error:", error);
    return res.status(500).json({ error: "Server error updating blog item." });
  }
};

/**
 * DELETE /api/blogs/items/:blogId
 * Admin Only: Remove a blog item from the array.
 */
exports.deleteBlogItem = async (req, res) => {
  try {
    const { blogId } = req.params;
    let page = await BlogPage.findOne();
    if (!page) {
      return res.status(404).json({ error: "Blog page not found." });
    }

    const item = page.blogs.id(blogId);
    if (!item) {
      return res.status(404).json({ error: "Blog item not found." });
    }

    // Remove the subdocument
    page.blogs.pull(blogId);
    await page.save();
    return res.status(200).json({
      message: "Blog item deleted successfully.",
      page,
    });
  } catch (error) {
    console.error("deleteBlogItem Error:", error);
    return res.status(500).json({ error: "Server error deleting blog item." });
  }
};
