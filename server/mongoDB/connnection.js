const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const url = process.env.MONGO_URL

const mongoConnection = async () => {
    try {
        await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("MongoDB Connected")
    }
    catch (error) {
        console.log("Error while connecting MongoDB")
    }
}

module.exports = mongoConnection