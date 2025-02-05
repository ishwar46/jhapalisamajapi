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

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))


app.get('/', (req, res) => {
    res.send("Hello!! This Req is from the Server.....")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})