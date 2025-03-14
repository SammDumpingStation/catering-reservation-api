import bcrypt from "bcryptjs";
import Customer from "../schemas/customer.schema.js";
import { createToken } from "../utils/authUtils.js";
import { encryptPassword } from "../utils/checkExistence.js";

//Implement Sign-up Logic
const signUp = async (req, res, next) => {
  //Start of Mongoose  Transaction that will run Atomic Updates/Operations
  //Atomic Operation -> All operations must be successful Or Nothing (Will stop the session if something is wrong
  try {
    //Create a new customer
    const { fullName, email, password } = req.body;

    //Check if a customer already exists
    const existingCustomer = await Customer.findOne({ email }); //utils

    if (existingCustomer) {
      const error = new Error("Customer already exists");
      error.statusCode = 400; //400 ->  Bad Request
      throw error;
    }

    //This is where we create the customer data that fits the schema we created in customer.model.js
    const newCustomer = await Customer.create([
      { fullName, email, password: encryptPassword(password) },
    ]);

    //Create a session token for the customer for them to sign in
    const token = createToken(newCustomer[0]._id);
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
    const token = createToken(customer._id);

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
const signOut = async (req, res, next) => {
  try {
    // Get the authentication token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is provided, return an error
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401; // 401 -> Unauthorized
      throw error;
    }

    // Return a success response
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut };
