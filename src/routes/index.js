const authRoutes = require('./authRoutes');
const messagesRoutes = require('./messagesRoutes')
const mountRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/messages', messagesRoutes)
}


module.exports = mountRoutes