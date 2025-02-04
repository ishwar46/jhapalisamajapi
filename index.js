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

const directories = [
    "public/uploads",
    "public/uploads/portfolioimage",
    "public/uploads/trustedimage",
    "public/uploads/staffimage",
    "public/uploads/technologyimage",
    "public/uploads/lottieFile",
    "public/uploads/resumes"
]

directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
})

//Now Defining Route
app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")))
app.use("/public/uploads/portfolioimage", express.static(path.join(__dirname, "public/uploads/portfolioimage")))
app.use("/public/uploads/trustedimage", express.static(path.join(__dirname, "public/uploads/trustedimage")))
app.use("/public/uploads/staffimage", express.static(path.join(__dirname, "public/uploads/staffimage")))
app.use("/public/uploads/technologyimage", express.static(path.join(__dirname, "public/uploads/technologyimage")))
app.use("/public/uploads/lottieFile", express.static(path.join(__dirname, "public/uploads/lottieFile")))
app.use("/uploads/resumes", express.static(path.join(__dirname, "public/uploads/resumes")));


app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/service", require("./routes/serviceRoute"))
app.use("/api/portfolio", require("./routes/portfolioRoute"))
app.use("/api/technology", require("./routes/technologyRoute"))
app.use("/api/trust", require("./routes/trustedRoute"))
app.use("/api/staff", require("./routes/staffRoutes"))
//Career Routes
app.use("/api/careers", require("./routes/careerRoutes"))
// Application Routes
app.use("/api/applications", require("./routes/applicationRoute"))
app.use("/api/auth", require("./routes/userRoutes"))


app.get('/', (req, res) => {
    res.send("Hello!! This Req is from the Server.....")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})