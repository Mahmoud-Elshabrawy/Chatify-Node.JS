const dotenv = require('dotenv')
dotenv.config()


const {Server} = require('socket.io')
const express = require('express')
const http = require('http')
const { socketAuth } = require('../middlewares/socket')


const app = express()
const server = http.createServer(app)

const io = new Server(server)

io.use(socketAuth)

const getReceiverSocketId = (userId) => {
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.user.name}`)
    const userId = socket.userId
    userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.user.name}`)
        delete (userSocketMap[userId])
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

module.exports =  {io, app, server, getReceiverSocketId}