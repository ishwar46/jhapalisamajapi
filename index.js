const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const connectToDatabase = require("./database/db");
const http = require("http");
const fs = require("fs");
const path = require("path");
const webhookRoutes = require("./routes/webhookRoutes");
const donationRoutes = require("./routes/donationRoutes");
const setupSocket = require("./utils/socket");

env.config();

const app = express();

app.use("/webhook", webhookRoutes);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  // origin: true,
  origin: ["https://jhapali.org", "https://www.jhapali.org"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/uploads", require("./routes/uploadRoutes"));
app.use("/api/menu-items", require("./routes/menuRoutes"));
app.use("/api/sidebar", require("./routes/sidebarRoutes"));
app.use("/api/hero-slides", require("./routes/heroSlideRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/programs", require("./routes/programsRoutes"));
app.use("/api/testimonials", require("./routes/testimonialsRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/mission-story", require("./routes/missionStroryRoutes"));
app.use("/api/stories", require("./routes/storyRoutes"));
app.use("/api/scholarships", require("./routes/scholarshipRoutes"));
app.use(
  "/api/scholarship-recipients",
  require("./routes/scholarshipRecipientsRoutes")
);
app.use("/api/hearse-vehicles", require("./routes/hearseVehicleRoutes"));
app.use(
  "/api/executive-committee",
  require("./routes/executiveCommitteeRoutes")
);
app.use("/api/annual-donations", require("./routes/annualDonationRoutes"));
app.use("/api/onetime-donations", require("./routes/onetimeDonationRoutes"));
app.use("/api/dmv-chapter", require("./routes/dmvChapterRoutes"));
app.use("/api/texas-chapter", require("./routes/texasChapterRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));
app.use("/api/about-us", require("./routes/aboutUsRoutes"));
app.use("/api/impact-summary", require("./routes/impactSummaryRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/president-message", require("./routes/presidentMessageRouter"));
app.use("/api/settings", require("./routes/settingsRoute"));
app.use("/api/news-letter", require("./routes/newsLetterRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/attendeePage", require("./routes/attendeeRoutes"));

app.use("/api", donationRoutes);

app.get("/", (req, res) => {
  res.send("Hello!! This is Jhapali Samaja USA");
});

const PORT = process.env.PORT || 5500;
const server = http.createServer(app);

connectToDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
  });
  setupSocket(server);
});
