import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { allowedOrigins } from "app.js";

let io: Server;

const socketConnection = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected!");

    // You can emit a message to the client
    socket.emit("connected", {
      message: "Successfully connected to the server!",
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected!");
    });
  });
};

export { io, socketConnection };
