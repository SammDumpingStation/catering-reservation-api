import Customer from "@schemas/customer.schema.js";
import { updateCustomerProps } from "@TStypes/customer.type.js";
import { encryptPassword } from "@utils/authUtils.js";
import { createError } from "@utils/globalUtils.js";

export const updateCustomerById: updateCustomerProps = async (id, data) => {
  const { fullName, email, password, contactNumber, profileImage } = data;

  const existingCustomer = await Customer.findByIdAndUpdate(
    id,
    {
      fullName,
      email,
      password: await encryptPassword(password),
      contactNumber,
      profileImage,
    },
    { new: true }
  );

  return existingCustomer;
};
