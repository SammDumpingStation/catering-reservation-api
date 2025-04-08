import * as authModel from "@models/auth.model.js";
import Customer from "@schemas/customer.schema.js";
import { createError } from "@utils/globalUtils.js";
import {
  createToken,
  sanitizeCustomer,
  validatePassword,
} from "@utils/authUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";

//Implement Sign-up Logic
const signUp: FunctionProps = async (req, res, next) => {
  try {
    const data = req.body;

    const existingCustomer = await Customer.findOne({ email: data.email });
    if (existingCustomer) throw createError("Customer already exists", 400);

    const { customer } = await authModel.createAccount(data);

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: {
        token: createToken(customer._id, customer.role),
        customer: sanitizeCustomer(customer),
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implement Sign-In Logic
const signIn: FunctionProps = async (req, res, next) => {
  try {
    //Deconstruct the json form from body
    const data = req.body;

    const existingCustomer = await Customer.findOne({ email: data.email });
    if (!existingCustomer) throw createError("Customer doesn't exist", 404);

    const isPasswordValid = await validatePassword(
      data.password,
      existingCustomer.password
    );
    if (!isPasswordValid) throw createError("Invalid password", 401);

    res.status(201).json({
      success: true,
      message: "Customer signed in successfully",
      data: {
        token: createToken(existingCustomer._id, existingCustomer.role),
        customer: sanitizeCustomer(existingCustomer),
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implement Sign-Out Logic
const signOut: FunctionProps = async (req, res, next) => {
  try {
    // Get the authentication token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    const { message } = await authModel.signOutAccount(token!); //Temporary solution since i still dont know what to do here

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut };
