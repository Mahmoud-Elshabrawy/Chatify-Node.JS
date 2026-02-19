const express = require('express')
const { signUpValidator, logInValidator } = require('../validators/authValidators')
const { signup, login, logout, refreshToken } = require('../controller/authController')

const router = express.Router()


router.post('/signup', signUpValidator, signup)
router.post('/login', logInValidator, login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)

module.exports = router