// This File Only For Test...

const { io } = require("socket.io-client");

const port = 3000;

// TOKEN OF USER A
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OWI3MjY2ZmVmYTkyODJiMGY0Mzc1MiIsInRzIjoxNzcyNjcxMDQ4OTY5LCJpYXQiOjE3NzI2NzEwNDgsImV4cCI6MTc3MjY3NDY0OH0.nGEO1diwmGd3gRpbgA1Z3ZdM_uVxEPSlZwuGJEqegtQ";

// USER B ID
const receiverId = "699b7266fefa9282b0f43752";

const socket = io(`http://localhost:${port}`, {
  extraHeaders: {
    Cookie: `accessToken=${token}`
  }
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // send typing after 5 seconds
  setTimeout(() => {
    console.log("Sender typing...");
    socket.emit("typing", { receiverId });
  }, 5000);

  // stop typing after 10 seconds
  setTimeout(() => {
    console.log("Sender stopTyping...");
    socket.emit("stopTyping", { receiverId });
  }, 10000);
});

socket.on("getOnlineUsers", (users) => {
  console.log("Online Users:", users);
});

socket.on("typing", (data) => {
  console.log("Typing from:", data.senderId);
});

socket.on("stopTyping", (data) => {
  console.log("Stop typing from:", data.senderId);
});

socket.on("connect_error", (err) => {
  console.log("Connection Error:", err.message);
});