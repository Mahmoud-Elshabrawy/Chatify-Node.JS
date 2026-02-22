const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
    {
        text: String,
        image: String,
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)



const Message = mongoose.model('Message', MessageSchema)
module.exports = Message