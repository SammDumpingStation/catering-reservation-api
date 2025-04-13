import * as authModel from "@models/auth.model.js";
import Customer from "@schemas/customer.schema.js";
import { createError } from "@utils/globalUtils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  sanitizeCustomer,
  setTokenCookie,
  validatePassword,
  verifyToken,
} from "@utils/authUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";
import {
  IDecodedAccessToken,
  IDecodedRefreshToken,
} from "@TStypes/auth.type.js";

//Implement Sign-up Logic
const signUp: FunctionProps = async (req, res, next) => {
  try {
    const data = req.body;

    const existingCustomer = await Customer.findOne({ email: data.email });
    if (existingCustomer) throw createError("Customer already exists", 400);

    const { customer } = await authModel.createAccount(data);

    // Generate the access token
    const accessToken = generateAccessToken(
      customer._id as string,
      customer.role
    );
    const refreshToken = generateRefreshToken(
      customer._id as string,
      customer.email,
      customer.fullName,
      customer.role
    );

    setTokenCookie(res, "access_token", accessToken, "/");
    setTokenCookie(
      res,
      "refresh_token",
      refreshToken,
      "/api/auth/refresh",
      1000 * 60 * 60 * 24
    ); // 1 day

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: {
        // accessToken,  // Temporary
        // refreshToken, // Temporary
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
      existingCustomer._id as string,
      existingCustomer.role
    );
    const refreshToken = generateRefreshToken(
      existingCustomer._id as string,
      existingCustomer.email,
      existingCustomer.fullName,
      existingCustomer.role
    );

    setTokenCookie(res, "access_token", accessToken, "/");
    setTokenCookie(
      res,
      "refresh_token",
      refreshToken,
      "/api/auth/refresh",
      1000 * 60 * 60 * 24
    ); // 1 day

    res.status(201).json({
      success: true,
      message: "Customer signed in successfully",
      data: {
        // accessToken, // Temporary
        // refreshToken, // Temporary
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
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      path: "/", // Must match path used in sign-in
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      path: "/api/auth/refresh", // Must match path used in sign-in
    });

    res.status(200).json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentCustomer: FunctionProps = async (req, res, next) => {
  try {
    const { access_token } = req.signedCookies;
    if (!access_token) throw createError("Authentication required", 401);

    const { customerId } = verifyToken(
      access_token,
      "access"
    ) as IDecodedAccessToken;

    const currentCustomer = await Customer.findById(customerId);
    if (!currentCustomer) throw createError("Customer doesn't exist", 404);

    res.status(200).json({
      success: true,
      customer: sanitizeCustomer(currentCustomer),
    });
  } catch (error) {
    next(error);
  }
};

const generateNewAccessToken: FunctionProps = (req, res, next) => {
  try {
    const { refresh_token } = req.signedCookies;
    if (!refresh_token) throw createError("Authentication required", 401);

    const decoded = verifyToken(refresh_token, "refresh");
    if (!decoded) throw createError("Invalid or expired refresh token", 403);

    const { customerId, role } = decoded as IDecodedRefreshToken;
    const newAccessToken = generateAccessToken(customerId, role);

    setTokenCookie(res, "access_token", newAccessToken, "/");

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut, getCurrentCustomer, generateNewAccessToken };
