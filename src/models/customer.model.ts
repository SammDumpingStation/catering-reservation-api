import Customer from "@schemas/customer.schema.js";
import { updateCustomerProps } from "@TStypes/customer.type.js";
import { createError } from "@utils/globalUtils.js";

export const getCustomerById = async (id: string) => {
  const existingCustomer = await Customer.findById(id);

  if (!existingCustomer) throw createError("Customer doesn't exist", 404);
  return existingCustomer;
};

export const updateCustomerById = async ({
  id,
  fullName,
  contactNumber,
  profileImage,
}: updateCustomerProps) => {
  const existingCustomer = await Customer.findByIdAndUpdate(
    id,
    {
      fullName,
      contactNumber,
      profileImage,
    },
    { new: true, runValidators: true }
  );

  if (!existingCustomer) throw createError("Customer doesn't exist", 404);
  return existingCustomer;
};

export const deleteCustomerById = async (id: string) => {
  const existingCustomer = await Customer.findByIdAndDelete(id);

  if (!existingCustomer) throw createError("Customer doesn't exist", 404);
  return existingCustomer;
};
