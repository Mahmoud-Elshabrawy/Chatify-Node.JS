

const { check } = require('express-validator')
const { validators } = require('../middlewares/validators')
const User = require('../models/userModel')



exports.signUpValidator = [
    check('name').notEmpty().withMessage('User name required'),
    check('email').notEmpty().withMessage('email required').isEmail().withMessage("invalid email address").custom(async (val) => {
        const emailExists = await User.findOne({ email: val })
        if (emailExists) {
            throw new Error(`this email address: ${val} already exists, please login`)
        }
    }),
    check("password")
        .notEmpty()
        .withMessage("password required").isLength({ min: 6 }).withMessage('password must be at least 6 characters')
    , validators
]