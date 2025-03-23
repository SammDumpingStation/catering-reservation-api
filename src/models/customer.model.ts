import Customer from "@schemas/customer.schema.js";
import { createError } from "@utils/authUtils.js";
import { Types } from "mongoose";

export const getCustomerById = async (id: Types.ObjectId) => {
  const existingCustomer = await Customer.findById(id);

  if (!existingCustomer) throw createError("Customer doesn't exist!", 404);

  return existingCustomer;
};
