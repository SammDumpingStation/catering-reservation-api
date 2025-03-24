import { CustomError } from "@TStypes/error-middleware.type.js";
import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

const errorMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    let error = { ...err } as CustomError;
    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not Found";
      error = new Error(message) as CustomError;
      error.statusCode = 404;
    }

    // Mongoose Duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors || {}).map(
        (val) => (val as { message: string }).message
      );
      error = new Error(messages.join(", ")) as CustomError;
      error.statusCode = 400;
    }

    // Don't return the response object
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
