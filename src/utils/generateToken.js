const JWT = require('jsonwebtoken')

exports.generateToken = (id) => {
    return JWT.sign({id, ts: Date.now()}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_IN,})
}