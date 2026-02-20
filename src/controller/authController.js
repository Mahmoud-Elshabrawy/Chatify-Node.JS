const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const JWT = require('jsonwebtoken')
const AppError = require('../utils/appError')
const bcrypt = require('bcryptjs')
const cloudinary = require('../utils/cloudinary')


exports.signup = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)

    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        status: 'success',
        accessToken
    })
})



exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password)
        return next(new AppError('Please provide correct email and password', 400))

    // check if the user exists and the password matches
    const user = await User.findOne({ email: email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError("Incorrect email or password", 401))

    // if user loggedin successfully generate token
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)
    user.refreshToken = refreshToken
    await user.save()

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.status(200).json({
        status: 'success',
        accessToken
    })
})




exports.refreshToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
        return next(new AppError('no refresh token', 401))

    const decoded = JWT.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY)
    const user = await User.findById(decoded.id)

    if (!user || user.refreshToken !== refreshToken)
        return next(new AppError('Invalid refresh token', 403))

    const accessToken = generateAccessToken(user._id)
    res.status(200).json({
        status: 'success',
        accessToken
    })

})

exports.logout = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (refreshToken) {
        const user = await User.findOne({ refreshToken: refreshToken })
        if (user) {
            user.refreshToken = null
            await user.save()
        }
    }

    res.clearCookie('refreshToken')
    res.status(200).json({
        status: 'loggedout'
    })
})


exports.protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token)
        return next(new AppError('You are not logged in, Please log in', 401))

    const decoded = JWT.verify(token, process.env.JWT_ACCESS_SECRET_KEY)

    const user = await User.findById(decoded.id)

    if (!user)
        return next(new AppError("The user belonging to this token doesn't exists", 401));

    req.user = user
    next()
})


exports.updateProfilePic = asyncHandler(async (req, res, next) => {
    if (!req.file)
        return next(new AppError('No image uploaded', 400))

    const result = await new Promise((resolve, reject) => {
        // console.log(cloudinary.config())

        const stream = cloudinary.uploader.upload_stream(
            { folder: 'chatify/users' },
            (error, result) => {
                if (error)
                    return reject(error)
                else
                    return resolve(result)

            }
        )
        stream.end(req.file.buffer)
    })

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { profileImg: result.secure_url },
        { new: true }
    )

    res.status(200).json({
        status: 'success',
        imageUrl: result.secure_url,
        user
    })

})