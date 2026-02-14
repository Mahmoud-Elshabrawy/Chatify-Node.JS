const express = require('express')
const { signUpValidator } = require('../validators/authValidators')
const { signup } = require('../controller/authController')

const router = express.Router()


router.post('/signup', signUpValidator, signup)

module.exports = router