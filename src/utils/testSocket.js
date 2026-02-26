
// This File Only For Test...


const { io } = require("socket.io-client");
const port = process.env.PORT
const socket = io(`http://localhost:${port}`, {
  extraHeaders: {
    Cookie: "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OWI3MjY2ZmVmYTkyODJiMGY0Mzc1MiIsInRzIjoxNzcyMTQ0NzAzODgxLCJpYXQiOjE3NzIxNDQ3MDMsImV4cCI6MTc3MjE0ODMwM30.CYgNLSIQMcocjVjlYXGw9RscZIJ98mFqNSWYm1Il3hg"
  }
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("getOnlineUsers", (users) => {
  console.log("Online Users:", users);
});

socket.on("newMessage", (message) => {
  console.log("New Message:", message);
});

socket.on("connect_error", (err) => {
  console.log("Connection Error:", err.message);
});