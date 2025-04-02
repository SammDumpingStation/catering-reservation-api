import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { PORT } from "@config/env.js";
import connectToDatabase from "@database/mongodb.js";
import errorMiddleware from "@middlewares/error.middleware.js";
import cors from "cors";

import authRouter from "@routes/auth.route.js";
import customerRouter from "@routes/customer.route.js";
import menuRouter from "@routes/menu.route.js";
import packageRouter from "@routes/package.route.js";
import paymentRouter from "@routes/payment.route.js";
import reservationRouter from "@routes/reservation.route.js";

const app: Application = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())
  .use(cookieParser());

// API MAIN ROUTES
app.use("/api/auth", authRouter);
app.use("/api/customers", customerRouter);
app.use("/api/menus", menuRouter);
app.use("/api/packages", packageRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/payments", paymentRouter);

// If there are errors occure it will go here.
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
