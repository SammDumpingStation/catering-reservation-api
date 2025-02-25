//User Related Routes
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/user.middleware.js";

const userRouter = Router();

//Get all users
userRouter.get("/", getUsers);

//Get User Details
userRouter.get("/:id", authorize, getUser);

//Create a New user
userRouter.post("/", createUser);

//Update a User
userRouter.put("/:id", updateUser);

//Delete a user
userRouter.delete("/:id", deleteUser);

export default userRouter;
