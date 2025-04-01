import Customer from "@schemas/customer.schema.js";
import {
  encryptPassword,
  createToken,
  validatePassword,
} from "@utils/authUtils.js";
import { signInProps, signUpProps } from "@TStypes/auth.type.js";
import { createError } from "@utils/globalUtils.js";

export const createAccount = async ({
  fullName,
  email,
  password,
  role,
}: signUpProps) => {
  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) throw createError("Customer already exists", 400);

  const newCustomer = await Customer.create({
    fullName,
    email,
    password: await encryptPassword(password),
    role,
  });

  return {
    token: createToken(newCustomer._id, role),
    customer: newCustomer,
  };
};

export const signInAccount = async ({ email, password }: signInProps) => {
  const customer = await Customer.findOne({ email });
  if (!customer) throw createError("Customer doesn't exist", 404);

  const isPasswordValid = await validatePassword(password, customer.password);
  if (!isPasswordValid) throw createError("Invalid password", 401);

  return {
    token: createToken(customer._id as string, customer.role as string),
    customer,
  };
};

export const signOutAccount = async (token: string) => {
  if (!token) throw createError("Not authenticated", 401);
  return { message: "Logged out successfully" };
};
