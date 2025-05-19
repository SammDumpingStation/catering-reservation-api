import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from "../config/env.js";
import bcrypt from "bcryptjs";
import { ICustomer } from "@TStypes/customer.type.js";
import { Response } from "express";

//Hash password
export const encryptPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);

//Validate password for signing in
export const validatePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(inputPassword, hashedPassword);

// Prevent to return the password
export const sanitizeCustomer = (customer: ICustomer) => {
  const { password, ...sanitizedCustomer } = customer.toObject();
  return sanitizedCustomer;
};

// Not Yet Implemented
export const generateAccessToken = (
  customerId: string,
  role: string,
  email: string
): string => {
  return jwt.sign({ customerId, role, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: Number(ACCESS_TOKEN_EXPIRES_IN),
  });
};

export const generateRefreshToken = (
  customerId: string,
  email: string,
  fullName: string,
  role: string,
  contactNumber?: string
): string => {
  return jwt.sign(
    { customerId, email, contactNumber, fullName, role },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: Number(REFRESH_TOKEN_EXPIRES_IN),
    }
  );
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

export const setTokenCookie = (
  res: Response,
  tokenName: string,
  token: string,
  path: string,
  maxAge: number = 15 * 60 * 1000 // Default to 15 minutes
) => {
  res.cookie(tokenName, token, {
    httpOnly: true, // Prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    // sameSite: "none",
    path,
    maxAge, // Set the cookie's expiration to 15 minutes (same as token expiration)
    signed: true, // Sign the cookie to prevent tampering
  });
};

// In clearing cookie it must match all the parameters the same as you set the cookie
export const clearTokenCookie = (
  res: Response,
  cookieName: string,
  path: string
) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: "none",
    path,
  });
};
