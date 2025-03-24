// Utility function to check if an instance exists
import { createError } from "@utils/authUtils.js";

export const checkIfExists = <T>(
  instance: T | null | undefined,
  resourceName: string = "Resource"
) => {
  if (!instance) throw createError(`${resourceName} not found`, 404);
  return instance
};
