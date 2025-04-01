import { CreateErrorProps } from "@TStypes/global.type.js";

//Creates an error based on if statement
export const createError = (
  message: string,
  statusCode: number
): CreateErrorProps => {
  const error: CreateErrorProps = new Error(message);
  error.statusCode = statusCode;
  return error;
};
