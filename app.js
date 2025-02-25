import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.route.js";
import menuRouter from "./routes/menu.route.js";
import packageRouter from "./routes/package.route.js";
import paymentRouter from "./routes/payment.route.js";
import reservationRouter from "./routes/reservation.route.js";
import transactionRouter from "./routes/transaction.route.js";

const app = express();

//This allows our app to handle json data sent in request (req)/API calls
app.use(express.json());

//This helps us process the form data sent via html forms in a simple format
app.use(express.urlencoded({ extended: false }));

//Reads cookies from app request so it can store user data
app.use(cookieParser());

//The app main routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/menus", menuRouter);
app.use("/api/v1/packages", packageRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/transactions", transactionRouter);
//Intercepts any errors mainly in mongoose
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send({ message: "hello world!" });
});

app.listen(PORT, async () => {
  console.log(`Server Running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
