const dotenv = require('dotenv')
dotenv.config()


const { Server } = require('socket.io')
const express = require('express')
const http = require('http')
const { socketAuth } = require('../middlewares/socket')
const Message = require('../models/messageModel')


const app = express()
const server = http.createServer(app)

const io = new Server(server)

io.use(socketAuth)

const getUserSocketId = (userId) => {
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.user.name}`)
    const userId = socket.userId
    userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    
    // Typing Indicator 
    socket.on('typing', (receivedId) => {
        const receiverSocketId = getUserSocketId(receivedId)
        if (receivedId) {
            io.to(receiverSocketId).emit('typing', {
                senderId: userId
            })
        }
    })
    
    socket.on('stopTyping', (receivedId) => {
        const receiverSocketId = getUserSocketId(receivedId)
        if (receivedId) {
            io.to(receiverSocketId).emit('stopTyping', {
                senderId: userId
            })
        }
    })

    // update message status to seen
    socket.on('messageSeen', async(messageId) => {
        const message = await Message.findById(messageId)
        if(! message) return
        if(message.receiverId.toString() !== socket.userId.toString())
            return
        message.status = 'seen'
        await message.save()

        const senderSocketId = getUserSocketId(message.senderId)
        io.to(senderSocketId).emit('messageSeen', {messageId})
    })



    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.user.name}`)
        delete (userSocketMap[userId])
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

module.exports = { io, app, server, getUserSocketId }