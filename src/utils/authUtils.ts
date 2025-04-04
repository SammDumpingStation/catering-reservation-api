import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import bcrypt from "bcryptjs";
import { CustomerProps } from "@TStypes/customer.type.js";

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
