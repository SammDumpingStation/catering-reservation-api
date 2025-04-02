import Customer from "@schemas/customer.schema.js";
import { updateCustomerProps } from "@TStypes/customer.type.js";
import { createError } from "@utils/globalUtils.js";

export const updateCustomerById: updateCustomerProps = async (id, data) => {
  const { fullName, email, password, contactNumber, profileImage } = data;

  const existingCustomer = await Customer.findByIdAndUpdate(
    id,
    {
      fullName,
      email,
      password,
      contactNumber,
      profileImage,
    },
    { new: true, runValidators: true }
  );

  return existingCustomer;
};

export const deleteCustomerById = async (id: string) => {
  const existingCustomer = await Customer.findByIdAndDelete(id);

  if (!existingCustomer) throw createError("Customer doesn't exist", 404);
  return existingCustomer;
};
