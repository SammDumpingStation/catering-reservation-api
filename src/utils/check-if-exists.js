//Check if an instance exists

export const checkIfExists = (instance, resourceName = 'Resource') => {
  if (!instance) {
    const error = new Error(`${resourceName} doesn't Exist!`);
    error.statusCode = 404;
    throw error;
  }
};
