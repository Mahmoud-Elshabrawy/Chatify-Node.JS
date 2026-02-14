const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then((connection) => {
            console.log(`DB Connected Successfully: ${connection.connection.host}`)
        })
    } catch (error) {
        console.log(`DB Connection Error: ${error}`)
        process.exit(1)
    }
}

module.exports = dbConnection