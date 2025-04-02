import { Request, Response, NextFunction } from "express";
import * as authModel from "@models/auth.model.js";
import { signUpProps } from "@TStypes/auth.type.js";
import Customer from "@schemas/customer.schema.js";
import { createError } from "@utils/globalUtils.js";
import { createToken } from "@utils/authUtils.js";

//Implement Sign-up Logic
const signUp = async (req: Request, res: Response, next: NextFunction) => {
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
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implement Sign-In Logic
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Deconstruct the json form from body
    const { email, password } = req.body;

    const { token, customer } = await authModel.signInAccount(email, password);

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
const signOut = async (req: Request, res: Response, next: NextFunction) => {
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
