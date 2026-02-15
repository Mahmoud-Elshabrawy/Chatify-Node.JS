const JWT = require('jsonwebtoken')

exports.generateAccessToken = (id) => {
    return JWT.sign(
        { id, ts: Date.now() },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: process.env.JWT_Access_EXPIRE_IN, }
    )
}

exports.generateRefreshToken = (id) => {
    return JWT.sign(
        {id},
        process.env.JWT_REFRESH_SECRET_KEY,
        {expiresIn: process.env.JWT_REFRESH_EXPIRE_IN}
    )
}