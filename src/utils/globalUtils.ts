import { ICreateError } from "@TStypes/global.type.js";

//Creates an error based on if statement
export const createError = (
  message: string,
  statusCode: number
): ICreateError => {
  const error: ICreateError = new Error(message);
  error.statusCode = statusCode;
  return error;
};
