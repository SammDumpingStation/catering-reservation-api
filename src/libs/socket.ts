import { CLIENT_URL } from "@config/env.js";
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

const socketConnection = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: CLIENT_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected!");

    socket.on("disconnect", () => {
      console.log("User Disconnected!");
    });
  });
};

export { io, socketConnection };
