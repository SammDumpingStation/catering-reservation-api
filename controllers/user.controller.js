import mongoose from "mongoose";
import User from "../models/user.model.js";

//Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

//Get User Details
const getUser = async (req, res) => {};

//Create a New user
const createUser = async (req, res) => {};

//Update a User
const updateUser = async (req, res) => {};

//Delete a user
const deleteUser = async (req, res) => {};

export { getUsers, getUser, createUser, updateUser, deleteUser };
