import bcrypt from "bcryptjs";

//Check if an instance exists
export const checkIfExists = (instance, resourceName = "Resource") => {
  if (!instance) {
    const error = new Error(`${resourceName} doesn't Exist!`);
    error.statusCode = 404;
    throw error;
  }
};

export const encryptPassword = async (password) => {
  console.log("Hashing Password Reached!"); // for debugging (my perspective only)
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
