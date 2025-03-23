import Customer from "../schemas/customer.schema.js";
import { encryptPassword, createToken } from "../utils/authUtils.js";

export const createAccount = async (fullName, email, password) => {
  //Check if a customer already exists
  const existingCustomer = await Customer.findOne({ email }); //utils

  if (existingCustomer) {
    const error = new Error("Customer already exists");
    error.statusCode = 400; //400 ->  Bad Request
    throw error;
  }

  //This is where we create the customer data that fits the schema we created in customer.model.js
  const newCustomer = await Customer.create([
    { fullName, email, password: await encryptPassword(password) },
  ]);

  //Create a session token for the customer for them to sign in
  const token = createToken(newCustomer[0]._id);
};
