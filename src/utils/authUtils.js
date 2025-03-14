import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

//Creation of token when signing in
export const createToken = (customerId) => {
  const token = jwt.sign({ customerId: customerId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};
