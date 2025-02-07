const mongoose = require("mongoose")
const env = require("dotenv")

env.config();

DB = process.env.DB_URL

const connectToDatabase = () => {
    mongoose.connect(DB).then(() => {
        console.log(`Database is Connected`)
    })
}

module.exports = connectToDatabase;