import Customer from "@schemas/customer.schema.js";
import { encryptPassword } from "@utils/authUtils.js";
import { SignUpProps } from "@TStypes/auth.type.js";

export const createAccount: SignUpProps = async (data) => {
  return {
    customer: await Customer.create({
      fullName: data.fullName,
      email: data.email,
      password: await encryptPassword(data.password),
    }),
  };
};
