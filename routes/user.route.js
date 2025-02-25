//User Related Routes
import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

//Get all users
userRouter.get("/", getUsers);

//Get User Details
userRouter.get("/:id", (req, res) => res.send({ title: "GET User Details" }));

//Create a New user
userRouter.post("/", (req, res) => res.send({ title: "Create a New User" }));

//Update a User
userRouter.put("/:id", (req, res) => res.send({ title: "Update a User" }));

//Delete a user
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE A User" }));

export default userRouter;
