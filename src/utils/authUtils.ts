import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from "../config/env.js";
import bcrypt from "bcryptjs";
import { CustomerProps } from "@TStypes/customer.type.js";
import ms from "ms";

//Create access token
export const createToken = (customerId: string, role: string): string =>
  jwt.sign({ customerId, role }, JWT_SECRET, {
    expiresIn: Number(JWT_EXPIRES_IN),
  });

//Hash password
export const encryptPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);

//Validate password for signing in
export const validatePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(inputPassword, hashedPassword);

// Prevent to return the password
export const sanitizeCustomer = (customer: CustomerProps) => {
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

export const generateRefreshToken = (customerId: string): string => {
  return jwt.sign({ customerId }, REFRESH_TOKEN_SECRET, {
    expiresIn: Number(REFRESH_TOKEN_EXPIRES_IN),
  });
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
};
