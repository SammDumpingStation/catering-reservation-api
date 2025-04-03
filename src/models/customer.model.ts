import Customer from "@schemas/customer.schema.js";
import { UpdateCustomerProps } from "@TStypes/customer.type.js";
import { encryptPassword } from "@utils/authUtils.js";
import { createError } from "@utils/globalUtils.js";

export const updateCustomerById: UpdateCustomerProps = async (id, data) => {
  const { fullName, email, password, contactNumber, profileImage } = data;

  return await Customer.findByIdAndUpdate(
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
};
