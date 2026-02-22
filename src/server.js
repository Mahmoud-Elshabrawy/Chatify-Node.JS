const dotenv = require('dotenv')
dotenv.config()


const express = require('express')
const dbConnection = require('./config/db')
const mountRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const AppError = require('./utils/appError')


dbConnection()






const app = express()

app.use(express.json())
app.use(cookieParser())


// Mounted Rotues
mountRoutes(app)

app.use((req, res, next) => {
    next(new AppError(`can\'t find this route : ${req.originalUrl}`, 404))
})

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