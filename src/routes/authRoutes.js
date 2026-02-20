const express = require('express')
const { signUpValidator, logInValidator } = require('../validators/authValidators')
const { signup, login, logout, refreshToken, updateProfilePic, protect } = require('../controller/authController')
const { uploadSingleImg } = require('../middlewares/multer')

const router = express.Router()


router.post('/signup', signUpValidator, signup)
router.post('/login', logInValidator, login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)
router.patch('/updateProfilePic',protect, uploadSingleImg('image'), updateProfilePic)

module.exports = router