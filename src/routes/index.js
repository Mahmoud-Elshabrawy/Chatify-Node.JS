const authRoutes = require('./authRoutes.js');


const mountRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes)
}


module.exports = mountRoutes