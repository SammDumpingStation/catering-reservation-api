import Customer from "@schemas/customer.schema.js";
import {
  encryptPassword,
  createToken,
  validatePassword,
  sanitizeCustomer,
} from "@utils/authUtils.js";
import { SignUpProps } from "@TStypes/auth.type.js";
import { createError } from "@utils/globalUtils.js";

export const createAccount: SignUpProps = async (data) => {
  return {
    customer: await Customer.create({
      fullName: data.fullName,
      email: data.email,
      password: await encryptPassword(data.password),
    }),
  };
};

export const signOutAccount = async (token: string) => {
  if (!token) throw createError("Not authenticated", 401);
  return { message: "Logged out successfully" };
};
