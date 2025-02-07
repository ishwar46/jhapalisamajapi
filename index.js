const express = require("express")
const cors = require("cors")
const env = require("dotenv")
const connectToDatabase = require("./database/db")
const fs = require("fs")
const path = require("path")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
env.config();

connectToDatabase();

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

// const directories = [
//     "public/uploads",
//     "public/uploads/portfolioimage",
//     "public/uploads/trustedimage",
//     "public/uploads/staffimage",
//     "public/uploads/technologyimage",
//     "public/uploads/lottieFile",
//     "public/uploads/resumes"
// ]

// directories.forEach((dir) => {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// })

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))
app.use('/api/uploads', require('./routes/uploadRoutes'));
app.use('/api/menu-items', require('./routes/menuRoutes'));
app.use('/api/sidebar', require('./routes/sidebarRoutes'))
app.use('/api/hero-slides', require('./routes/heroSlideRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/programs', require('./routes/programsRoutes'));
app.use('/api/testimonials', require('./routes/testimonialsRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/mission-story', require('./routes/missionStroryRoutes'));
app.use("/api/stories", require("./routes/storyRoutes"));



app.get('/', (req, res) => {
    res.send("Hello!! This is Jhapali Samaja USA")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})