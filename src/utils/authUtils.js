import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import bcrypt from "bcryptjs";

//Create access token
export const createToken = (customerId) =>
  jwt.sign({ customerId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//Hash password
export const encryptPassword = async (password) =>
  await bcrypt.hash(password, 10);

//Validate password for signing in
export const validatePassword = async (inputPassword, hashedPassword) =>
  await bcrypt.compare(inputPassword, hashedPassword);
