import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import bcrypt from "bcryptjs";

//Create access token
export const createToken = (customerId: string): string =>
  jwt.sign({ customerId }, JWT_SECRET, { expiresIn: "1d" });

//Hash password
export const encryptPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);

//Validate password for signing in
export const validatePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(inputPassword, hashedPassword);

export interface CustomError extends Error {
  statusCode?: number;
}

//Creates an error based on if statement
export const createError = (
  message: string,
  statusCode: number
): CustomError => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  return error;
};
