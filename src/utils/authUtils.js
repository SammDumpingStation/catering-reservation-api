import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import bcrypt from "bcryptjs";

//Creation of token when signing in
export const createToken = (customerId) => {
  const token = jwt.sign({ customerId: customerId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

export const encryptPassword = async (password) => {
  console.log("Hashing Password Reached!"); // for debugging (my perspective only)
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
