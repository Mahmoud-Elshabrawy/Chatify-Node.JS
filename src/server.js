const express = require('express')
const dotenv = require('dotenv')
dotenv.config()






const app = express()

app.get('/', (req, res, next) => {res.send("hello")})

const Port = process.env.PORT || 3000
app.listen(Port, () => {
    console.log(`App Running on port: ${Port}`);
})