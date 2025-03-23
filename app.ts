import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "@config/env.js";
import connectToDatabase from "@database/mongodb.js";
import errorMiddleware from "@middlewares/error.middleware.js";

import authRouter from "@routes/auth.route.js";
import customerRouter from "@routes/customer.route.js";
import menuRouter from "@routes/menu.route.js";
import packageRouter from "@routes/package.route.js";
import paymentRouter from "@routes/payment.route.js";
import reservationRouter from "@routes/reservation.route.js";

const app = express();

//This allows our app to handle json data sent in request (req)/API calls
app.use(express.json());

//This helps us process the form data sent via html forms in a simple format
app.use(express.urlencoded({ extended: false }));

//Reads cookies from app request so it can store customer data
app.use(cookieParser());

//The app main routes
app.use("/api/auth", authRouter);
app.use("/api/customers", customerRouter);
app.use("/api/menus", menuRouter);
app.use("/api/packages", packageRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/payments", paymentRouter);

//Intercepts any errors mainly in mongoose
app.use(errorMiddleware);

await connectToDatabase((client) => {
  if (!client) return;

  app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
  });
});
