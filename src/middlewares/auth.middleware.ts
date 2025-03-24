// middleware/auth.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createError } from "@utils/authUtils.js";
import { JWT_SECRET } from "../config/env.js";
import { CustomError } from "@TStypes/error-middleware.type.js";

// Define the shape of the JWT payload
interface UserPayload {
  id: string;
  role: string;
}

// Extend Express Request type to include user or guest info
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Registered customer or caterer
      isGuest?: boolean; // Guest boolean
    }
  }
}

// Middleware to check user type
export const checkUserType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  // Check Number 1: We set the req to carry a non-registered user and continue
  if (!token) {
    req.isGuest = true; // Set as guest
    req.user = undefined; // No user data
    return next(); // Proceed
  }

  // Check 2: Token present (Registered User or Caterer)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

    // Ensures that there is a role (caterer or customer) if not, errors
    if (!decoded.role) {
      throw createError("Invalid token: role is missing", 401);
    }

    // Attach decoded user information to req
    req.user = decoded;
    req.isGuest = false;

    // Optional: Log or validate specific roles
    if (["customer", "caterer"].includes(decoded.role)) {
      next(); //Proceed Normally
    } else {
      throw createError("Invalid role", 403);
    }
  } catch (error) {
    // Handle JWT-specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
    }
    const err = error as CustomError;
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";
    res.status(statusCode).json({ message });
  }
};

// Middleware to restrict to registered users only (no guests)
export const registeredCustomersOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isGuest || !req.user) {
    return res
      .status(401)
      .json({ message: "You need to login to access this resource" });
  }
  return next();
};

// Middleware to restrict to registered customers only only
export const customerOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user!.role !== "customer") {
    return res.status(403).json({ message: "Customer access required" });
  }
  return next();
};

// Middleware to restrict to caterer only
export const catererOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user!.role !== "caterer") {
    res.status(403).json({ message: "Caterer access required" });
  }
  next();
};
