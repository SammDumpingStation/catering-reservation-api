import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import Customer from "../models/customer.model.js";
//Implement Sign-up Logic
const signUp = async (req, res, next) => {
  //Start of Mongoose  Transaction that will run Atomic Updates/Operations
  //Atomic Operation -> All operations must me successful Or Nothing (Will stop the session if something is wrong)
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //Create a new customer
    const { name, email, password } = req.body;

    //Check if a customer already exists
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      const error = new Error("Customer already exists");
      error.statusCode = 409; //409 ->  Conflict: Duplicate data
      throw error;
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //This is where we create the customer data that fits the schema we created in customer.model.js
    const newCustomer = await Customer.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    //Create a session token for the customer for them to sign in
    const token = tokenCreation(newCustomer._id);

    //If all is successful, then "commit" or "do" the transaction
    await session.commitTransaction();
    session.endSession();

    //Return a success code for Customer registration/creation
    //201 -> Created: Resource successfully created.
    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: {
        token,
        customer: newCustomer[0],
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

    //Create a customer instance
    const customer = await Customer.findOne({ email });

    //Check if the customer exists by checking the customer's provided email
    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404; //Not Found: Resource does not exist
      throw error;
    }

    //Check if the  provided password matches the password stored in the database
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401; //401 -> Unauthorized: Missing or invalid authentication ;
      throw error;
    }

    //Create a session token for the customer for them to sign in
    const token = tokenCreation(customer._id);

    //Return a success code for signing in successfully
    //201 -> Created: Resource successfully created.
    res.status(201).json({
      success: true,
      message: "Customer signed in successfully",
      data: {
        token,
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implement Sign-Out Logic
const signOut = async (req, res, next) => {};

//Creation of token when signing in
const tokenCreation = (customerId) => {
  const token = jwt.sign({ customerId: customerId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

export { signUp, signIn, signOut };
