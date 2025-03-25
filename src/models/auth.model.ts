import Customer from "@schemas/customer.schema.js";
import {
  encryptPassword,
  createToken,
  createError,
  validatePassword,
} from "@utils/authUtils.js";
import { signInProps, signUpProps } from "@TStypes/auth.type.js";

export const createAccount = async ({
  fullName,
  email,
  password,
}: signUpProps) => {
  // Explicitly check for password before creating
  if (!password) throw createError("Password is Required", 400);

  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) throw createError("Customer already exists", 400);

  const newCustomer = await Customer.create({
    fullName,
    email,
    password: await encryptPassword(password),
  });

  return {
    token: createToken(newCustomer._id as string),
    customer: newCustomer,
  };
};

export const signInAccount = async ({ email, password }: signInProps) => {
  const customer = await Customer.findOne({ email });
  if (!customer) throw createError("Customer not found", 404);

  const isPasswordValid = await validatePassword(password, customer.password);
  if (!isPasswordValid) throw createError("Invalid password", 401);

  return { token: createToken(customer._id as string), customer };
};

export const signOutAccount = async (token: string) => {
  if (!token) throw createError("Not authenticated", 401);
  return { message: "Logged out successfully" };
};
