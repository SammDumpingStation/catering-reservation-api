import "module-alias/register.js"; // Register module-alias at the very top
import express, { Application } from "express";
import { CLIENT_URL, COOKIE_SECRET, PORT } from "@config/env.js";
import connectToDatabase from "src/libs/mongodb.js";
import errorMiddleware from "@middlewares/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticatedRoutes } from "@middlewares/auth.middleware.js";
import { createServer } from "http";

import authRouter from "@routes/auth.route.js";
import customerRouter from "@routes/customer.route.js";
import menuRouter from "@routes/menu.route.js";
import packageRouter from "@routes/package.route.js";
import paymentRouter from "@routes/payment.route.js";
import reservationRouter from "@routes/reservation.route.js";
import { socketConnection } from "@database/socket.js";

const app: Application = express();

// for websocket Create HTTP server from express app
const server = createServer(app);

// Establish socket connection
socketConnection(server);

app
  .use(
    cors({
      origin: CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      optionsSuccessStatus: 200, // for legacy browser support
      preflightContinue: false,
    })
  )
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser(COOKIE_SECRET))
  .use(authenticatedRoutes);

// API MAIN ROUTES
app.use("/api/auth", authRouter);
app.use("/api/customers", customerRouter);
app.use("/api/menus", menuRouter);
app.use("/api/packages", packageRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/payments", paymentRouter);

// If there are errors it will go here.
app.use(errorMiddleware);

await connectToDatabase((client) => {
  if (!client) return;

  server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
  });
});
