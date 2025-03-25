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

// Middleware to check user type, basically sets the Request User and isGuest to  be used in the whole app
export const checkUserType = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  // Check Number 1: We set the req to carry a non-registered user and continue
  if (!token) {
    req.isGuest = true; // Set as guest
    req.user = undefined; // No user data
    next(); // Proceed
    return;
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
      return;
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    const err = error as CustomError;
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";
    res.status(statusCode).json({ message });
    return;
  }
};

// Middleware to restrict to registered customers only only
export const customerOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user!.role !== "customer") {
    res.status(403).json({ message: "Customer access required" });
    return;
  }
  next();
};

// Middleware to restrict to caterer only
export const catererOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user!.role !== "caterer") {
    res.status(403).json({ message: "Caterer access required" });
    return;
  }
  next();
};

// Middleware Temporary as I dont Know if Caterer and Customer Reservations will be merged

// Middleware to check if user is authenticated
export const isAuthenticated = (
  req: Request & { user?: { id: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  if (!req.user) throw createError("Authentication required", 401);

  next();
};

// Middleware to check if user is a caterer
export const isCaterer = (
  req: Request & { user?: { id: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "caterer")
    throw createError("Caterer access required", 403);

  next();
};

// Middleware to check if user is a customer
export const isCustomer = (
  req: Request & { user?: { id: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "customer")
    throw createError("Customer access required", 403);

  next();
};

// Middleware to check if user is authorized to access a specific reservation
export const isReservationOwnerOrCaterer = async (
  req: Request & { user?: { id: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw createError("Authentication required", 401);

    // Caterers can access all reservations
    if (req.user.role === "caterer") {
      next();
    }

    // For customers, check if they own the reservation
    const { id } = req.params;
    const Reservation = require("../schemas/reservation.schema.js").default;
    const reservation = await Reservation.findById(id);

    if (!reservation) throw createError("Reservation not found", 404);

    if (reservation.customerId.toString() !== req.user.id)
      throw createError("Access denied. You don't own this reservation", 403);

    next();
  } catch (error) {
    next(error);
  }
};
