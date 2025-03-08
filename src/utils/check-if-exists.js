//Check if an instance exists

export const checkIfExists = async (instance) => {
  if (!instance) {
    const error = new Error("Customer doesn't Exist!");
    error.statusCode = 404;
    throw error;
  }
};
