import * as authModel from "@models/auth.model.js";
import Customer from "@schemas/customer.schema.js";
import { createError } from "@utils/globalUtils.js";
import {
  createToken,
  generateAccessToken,
  generateRefreshToken,
  sanitizeCustomer,
  setTokenCookie,
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
    const refreshToken = generateRefreshToken(
      customer._id,
      customer.email,
      customer.fullName,
      customer.role
    );

    setTokenCookie(res, "access_token", accessToken);
    setTokenCookie(res, "refresh_token", refreshToken);

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

    const accessToken = generateAccessToken(
      existingCustomer._id,
      existingCustomer.role
    );
    const refreshToken = generateRefreshToken(
      existingCustomer._id,
      existingCustomer.email,
      existingCustomer.fullName,
      existingCustomer.role
    );

    setTokenCookie(res, "access_token", accessToken);
    setTokenCookie(res, "refresh_token", refreshToken);

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
