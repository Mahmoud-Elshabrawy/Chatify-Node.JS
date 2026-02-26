const dotenv = require('dotenv')
dotenv.config()

const JWT = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError')


exports.socketAuth = asyncHandler(async(socket, next) => {
    // extract token
    const token = socket.handshake.headers.cookie 
    ?.split('; ') 
    .find((row) => row.startsWith('accessToken='))
    .split('=')[1]

    if(!token)
        return next(new AppError('Socket connection rejected: no token', 401))

    // verify token
    const decoded = JWT.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
    if(!decoded)
        return next(new AppError('Unauthorized', 401))

    const user = await User.findById(decoded.id)
    if(!user)
        return next(new AppError('user not found', 404))


    socket.user = user
    socket.userId = user._id
    next()

})