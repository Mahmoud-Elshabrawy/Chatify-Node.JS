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

MessageSchema.index({ senderId: 1, receiverId: 1 })
MessageSchema.index({ createdAt: 1 })


const Message = mongoose.model('Message', MessageSchema)
module.exports = Message