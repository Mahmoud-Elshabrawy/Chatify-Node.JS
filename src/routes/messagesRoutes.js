const express = require('express')
const { protect } = require('../controller/authController')
const { getAllContacts, getMessagesByUserId, sendMessage, getChatParteners } = require('../controller/messagesController')
const { uploadSingleImg } = require('../middlewares/multer')

const router = express.Router()

// console.log('messages routes')
router.get('/contacts', protect, getAllContacts)
router.get('/getChatParteners', protect, getChatParteners)
router.get('/:userId', protect, getMessagesByUserId)
router.post('/send/:userId', protect, uploadSingleImg('image'), sendMessage)





module.exports = router