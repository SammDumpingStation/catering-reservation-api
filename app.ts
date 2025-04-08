import "module-alias/register.js"; // Register module-alias at the very top
import express, { Application } from "express";
import { CLIENT_URL, PORT, SESSION_SECRET } from "@config/env.js";
import connectToDatabase from "@database/mongodb.js";
import errorMiddleware from "@middlewares/error.middleware.js";
import cors from "cors";
import session from "express-session";

import authRouter from "@routes/auth.route.js";
import customerRouter from "@routes/customer.route.js";
import menuRouter from "@routes/menu.route.js";
import packageRouter from "@routes/package.route.js";
import paymentRouter from "@routes/payment.route.js";
import reservationRouter from "@routes/reservation.route.js";
import {
  authenticatedRoutes,
  protectedRoutes,
} from "@middlewares/auth.middleware.js";

const app: Application = express();

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
  .use(
    session({
      name: "user",
      secret: SESSION_SECRET || "sessionSecret",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  )
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

  app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
  });
});

// const client = await connectToDatabase();
// if (client)
//   app.listen(PORT, () => {
//     console.log(`Server Running on http://localhost:${PORT}`);
//   });
