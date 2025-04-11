import * as authModel from "@models/auth.model.js";
import Customer from "@schemas/customer.schema.js";
import { createError } from "@utils/globalUtils.js";
import {
  createToken,
  generateAccessToken,
  generateRefreshToken,
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

    // Generate the access token
    const accessToken = generateAccessToken(customer._id, customer.role);

    // Set the access token in a cookie with appropriate flags
    res.cookie("access_token", accessToken, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      // sameSite: "strict", // Prevent CSRF attacks
      maxAge: 15 * 60 * 1000, // Set the cookie's expiration to 15 minutes (same as token expiration)
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: {
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

    // Generate the access token
    const accessToken = generateAccessToken(
      existingCustomer._id,
      existingCustomer.role
    );

    // Set the access token in a cookie with appropriate flags
    res.cookie("access_token", accessToken, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      // sameSite: "strict", // Prevent CSRF attacks
      maxAge: 15 * 60 * 1000, // Set the cookie's expiration to 15 minutes (same as token expiration)
    });

    res.status(201).json({
      success: true,
      message: "Customer signed in successfully",
      data: {
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
    const token = req.cookies["access_token"];
    if (!token) throw createError("Not authenticated", 401);

    // Clear the cookie on the client
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict", // or match your login cookie's sameSite
    });

    res.status(200).json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut };
