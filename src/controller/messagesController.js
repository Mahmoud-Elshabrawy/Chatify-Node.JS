const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Message = require('../models/messageModel')
const cloudinary = require('../utils/cloudinary')


exports.getAllContacts = asyncHandler(async (req, res, next) => {
    // get all Contacts (get all users except the loggedin user)
    const contacts = await User.find({ _id: { $ne: req.user._id } }).select('-refreshToken')
    res.status(200).json({
        status: 'success',
        contacts
    })
})

// get only contacts that logged user chat with them
exports.getChatParteners = asyncHandler(async(req, res, next) => {
    const myId = req.user._id

    const messages = await Message.find({
        $or: [
            {senderId: myId},
            {receiverId: myId}
        ]
    })

    let chatPartenersIds = []
    const check = messages.map((msg) => {
        if(msg.senderId.toString() === myId.toString()) 
            chatPartenersIds.push(msg.receiverId.toString())
        else
            chatPartenersIds.push(msg.senderId.toString())
    })
    // console.log(chatPartenersIds)

    const chatParteners = await User.find({_id: {$in: chatPartenersIds}}).select('-refreshToken')

    res.status(200).json({
        status: 'success',
        chatParteners
    })


})




// get messages between logged user and specific id
exports.getMessagesByUserId = asyncHandler(async (req, res, next) => {
    const myId = req.user._id
    const { userId } = req.params

    const messages = await Message.find(
        {
            $or: [
                { senderId: myId, receiverId: userId },
                { senderId: userId, receiverId: myId }
            ]
        }
    ).sort({createdAt: 1})


    res.status(200).json({
        status: 'success',
        messages
    })

})


exports.sendMessage = asyncHandler(async (req, res, next) => {
    const myId = req.user._id
    const { userId } = req.params
    const { text } = req.body
    // first if there is an image => send it to cloudinary
    let imageUrl
    if (req.file) {
        const result = await new Promise((resolve, reject) => {
            // console.log(cloudinary.config())

            const stream = cloudinary.uploader.upload_stream(
                { folder: 'chatify/messages' },
                (error, result) => {
                    if (error)
                        return reject(error)
                    else
                        return resolve(result)

                }
            )
            stream.end(req.file.buffer)
        })

        imageUrl = result.secure_url
    }
    const newMessage = await Message.create({
        senderId: myId,
        receiverId: userId,
        text,
        image: imageUrl
    })

    res.status(201).json({
        status: 'success',
        newMessage
    })
})