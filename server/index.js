const bodyParser = require('body-parser')
const express = require('express')
const authRouter = require('./routers/Auth.js')
const userRouter = require('./routers/Users.js')
const blogRouter = require('./routers/Blog.js')

require('dotenv').config()

const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());
const mongoConnection = require('./mongoDB/connnection.js')

const corsConfig = {
    credentials: true,
    origin: true,
};

const PORT = process.env.port || 3000
app.use(cookieParser())
app.use(bodyParser.json({extended: true, limit: "50mb"}))
app.use(bodyParser.urlencoded({extended: true, limit: "50mb", parameterLimit: 50000}))
app.use(cors(corsConfig))

app.use("/", authRouter)
app.use("/", userRouter)
app.use("/", blogRouter)

mongoConnection()
app.listen(PORT, () => {
    console.log(`Listening at post ${PORT}`)
})