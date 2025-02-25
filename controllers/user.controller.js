import mongoose from "mongoose";
import User from "../models/user.model.js";

//Get all users
const getUsers = async (req, res, next) => {
  try {
    //This will store the users from the database
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

//Get User Details
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404; //Not Found
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

//Create a New user
const createUser = async (req, res) => {};

//Update a User
const updateUser = async (req, res) => {};

//Delete a user
const deleteUser = async (req, res) => {};

export { getUsers, getUser, createUser, updateUser, deleteUser };
