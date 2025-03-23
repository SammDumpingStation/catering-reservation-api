import Customer from "../schemas/customer.schema.js";
import {
  encryptPassword,
  createToken,
  createError,
} from "../utils/authUtils.js";
import { signUpProps } from "../types/auth.type.js";

export const createAccount = async ({
  fullName,
  email,
  password,
}: signUpProps) => {
  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) throw createError("Customer already exists", 400);

  const newCustomer = await Customer.create({
    fullName,
    email,
    password: await encryptPassword(password),
  });

  return { token: createToken(newCustomer._id), customer: newCustomer };
};
