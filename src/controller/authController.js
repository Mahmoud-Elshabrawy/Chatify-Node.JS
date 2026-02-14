const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../utils/generateToken')

exports.signup = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body)
    const token = generateToken(user._id)
    res.status(201).json({
        status: 'success',
        token
    })
})