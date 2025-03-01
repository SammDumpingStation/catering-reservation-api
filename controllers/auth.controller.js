import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

import User from "../models/user.model.js"; // Do not forget to import the User schema

//Implement Sign-up Logic
const signUp = async (req, res, next) => {
  //Start of Mongoose  Transaction that will run Atomic Updates/Operations
  //Atomic Operation -> All operations must me successful Or Nothing (Will stop the session if something is wrong)
  const session = await mongoose.startSession();
  session.startTransaction();

  try { 
    //Create a new user
    const { name, email, password } = req.body;

    //Check if a user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409; //409 ->  Conflict: Duplicate data
      throw error;
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //This is where we create the user data that fits the schema we created in user.model.js
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    //Create a session token for the user for them to sign in
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    //If all is successful, then "commit" or "do" the transaction
    await session.commitTransaction();
    session.endSession();

    //Return a success code for User registration/creation
    //201 -> Created: Resource successfully created.
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    //If something went wrong, stop all activities
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

//Implement Sign-In Logic
const signIn = async (req, res, next) => {
  try {
    //Deconstruct the json form from body
    const { email, password } = req.body;

    //Create a user instance
    const user = await User.findOne({ email });

    //Check if the user exists by checking the user's provided email
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404; //Not Found: Resource does not exist
      throw error;
    }

    //Check if the  provided password matches the password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401; //401 -> Unauthorized: Missing or invalid authentication ;
      throw error;
    }

    //Create a session token for the user for them to sign in
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    //Return a success code for signing in successfully
    //201 -> Created: Resource successfully created.
    res.status(201).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implement Sign-Out Logic
const signOut = async (req, res, next) => {};


export { signUp, signIn, signOut };
