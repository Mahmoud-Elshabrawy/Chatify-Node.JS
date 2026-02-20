const dotenv = require('dotenv')
dotenv.config()


const express = require('express')
const dbConnection = require('./config/db')
const mountRoutes = require('./routes')
const cookieParser = require('cookie-parser')


dbConnection()






const app = express()

app.use(express.json())
app.use(cookieParser())


// Mounted Rotues
mountRoutes(app)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message,
    });
});


const Port = process.env.PORT || 3000
app.listen(Port, () => {
    console.log(`App Running on port: ${Port}`);
})