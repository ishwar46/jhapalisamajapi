// socket.js
const socketIo = require("socket.io");

const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on("userJoined", (data) => {
      io.emit("userJoinedMessage", `${data.name} has joined`);
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
};

module.exports = setupSocket;
