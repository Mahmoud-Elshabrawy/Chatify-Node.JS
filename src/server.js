const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./config/db')
const mountRoutes = require('./routes')
const cookieParser = require('cookie-parser')
dotenv.config()


dbConnection()






const app = express()

app.use(express.json())
app.use(cookieParser())


// Mounted Rotues
mountRoutes(app)

const Port = process.env.PORT || 3000
app.listen(Port, () => {
    console.log(`App Running on port: ${Port}`);
})