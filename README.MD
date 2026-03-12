# Chatify – Realtime Chat Backend

A backend-only realtime chat system built with **Node.js, Express, MongoDB, and Socket.IO**.

This project focuses on building a scalable and secure backend architecture for realtime messaging applications.  
The system supports authentication, realtime messaging, message status tracking, and image sharing.

The API can be tested using **Postman and Socket clients** without requiring a frontend.

---

# Features

## Authentication System
- User Signup
- User Login
- JWT Access Token
- Refresh Token System
- Logout
- Protected Routes

## Realtime Messaging
- Send messages in realtime using **Socket.IO**
- Store messages in **MongoDB**
- Online users tracking
- Typing indicator
- Realtime message delivery

## Message Status System
Each message has a status:

- `sent`
- `delivered`
- `seen`

## Media Support
- Send text messages
- Send images
- Image upload using **Multer**
- Cloud storage using **Cloudinary**

## Chat System
- Get all contacts
- Get chat partners
- Get conversation messages
- Realtime message updates

## Security
- JWT authentication
- Socket authentication middleware
- Secure API routes
- Environment variables for sensitive data

---

# Tech Stack

Backend
- Node.js
- Express.js

Realtime Communication
- Socket.IO

Database
- MongoDB
- Mongoose

Authentication
- JWT
- Refresh Tokens

File Upload
- Multer
- Cloudinary

Tools
- Postman
- Git
- GitHub

---

# Project Structure

```text
src
│
├── controllers
│   ├── authController.js
│   └── messagesController.js
│
├── models
│   ├── userModel.js
│   └── messageModel.js
│
├── routes
│   ├── authRoutes.js
│   └── messageRoutes.js
│
├── middlewares
│   ├── socket.js
│   └── multer.js
│
├── utils
│   ├── socket.js
│   ├── generateToken.js
│   ├── cloudinary.js
│   └── appError.js
│
└── test
    └── testSocket.js
```
---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mahmoud-Elshabrawy/Chatify-Node.JS
cd Chatify-Node.JS
npm install
run server (npm run dev)
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
