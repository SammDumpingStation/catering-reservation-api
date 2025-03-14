import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./src/config/env.js";
import { connectToDatabase } from "./src/database/mongodb.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

import authRouter from "./src/routes/auth.router.js";
import customerRouter from "./src/routes/customer.route.js";
import menuRouter from "./src/routes/menu.route.js";
import packageRouter from "./src/routes/package.route.js";
import paymentRouter from "./src/routes/payment.route.js";
import reservationRouter from "./src/routes/reservation.route.js";

const app = express();

//This allows our app to handle json data sent in request (req)/API calls
app.use(express.json());

//This helps us process the form data sent via html forms in a simple format
app.use(express.urlencoded({ extended: false }));

//Reads cookies from app request so it can store customer data
app.use(cookieParser());

//The app main routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/menus", menuRouter);
app.use("/api/v1/packages", packageRouter); 
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/payments", paymentRouter); //pending

//Intercepts any errors mainly in mongoose
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server Running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
