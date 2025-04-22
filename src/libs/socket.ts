import { CLIENT_URL } from "@config/env.js";
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

const socketConnection = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
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

    // Handle other events from the client
    socket.on("menuUpdated", (updatedMenu) => {
      console.log("Menu updated:", updatedMenu);
    });

    socket.on("menuCreated", (createdMenu) => {
      console.log("Menu created:", createdMenu);
    });
  });
};

export { io, socketConnection };
