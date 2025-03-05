const mongoose = require("mongoose");

const blogItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  blogImage: { type: String, default: "" },
  description: { type: String, default: "" },
  fullContent: { type: String, default: "" },
  postedBy: { type: String, default: "" },
  postedAt: { type: Date, default: Date.now },
});

const blogPageSchema = new mongoose.Schema(
  {
    pageTitle: { type: String, default: "Latest Blogs & Events" },
    pageSubtitle: { type: String, default: "" },
    blogs: [blogItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPage", blogPageSchema);
