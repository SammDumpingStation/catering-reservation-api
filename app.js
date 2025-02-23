import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";

import userRouter from "./routes/user.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

//This allows our app to handle json data sent in request (req)/API calls
app.use(express.json());

//This helps us process the form data sent via html forms in a simple format
app.use(express.urlencoded({ extended: false }));

//Reads cookies from app request so it can store user data
app.use(cookieParser());

//The app main routes
app.use("/api/users", userRouter);

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
