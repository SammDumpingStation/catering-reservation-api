// middleware/auth.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env.js";
import Reservation from "@schemas/reservation.schema.js";
import Payment from "@schemas/payment.schema.js";
import { createError } from "@utils/globalUtils.js";
import { DecodedToken } from "@TStypes/auth.type.js";
import { FunctionProps } from "@TStypes/global.type.js";

// Define protected routes with HTTP methods
// Format: { path: string, methods: string[] }
export const protectedRoutes = [
  { path: "/api/customers", methods: ["GET", "PUT", "DELETE"] },
  { path: "/api/menus", methods: ["POST", "PUT", "DELETE"] },
  { path: "/api/packages", methods: ["POST", "PUT", "DELETE"] },
];

// Middleware to check if the current route requires authentication
export const authenticatedRoutes: FunctionProps = (req, res, next) => {
  const currentPath = req.path;
  const currentMethod = req.method;

  // Check if the current path and method combination requires authentication
  const requiresAuth = protectedRoutes.some(
    (route) =>
      currentPath.startsWith(route.path) &&
      route.methods.includes(currentMethod)
  );

  // If authentication is not required for this path+method, proceed
  if (!requiresAuth) return next();

  // For protected routes, verify authentication
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) throw createError("Authentication required", 401);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded) throw createError("Invalid or expired token", 403);
    const { customerId, role } = decoded as DecodedToken;
    req.user = { id: customerId, role };
    next();
  });
};

// Middleware to check if user is a caterer
export const isCaterer: FunctionProps = (req, res, next) => {
  if (!req.user || req.user.role !== "caterer")
    throw createError("Caterer access required", 403);

  next();
};

// Middleware to check if user is a customer
export const isCustomer: FunctionProps = (req, res, next) => {
  if (!req.user || req.user.role !== "customer")
    throw createError("Customer access required", 403);

  next();
};

// Middleware to check if user is authorized to access a specific reservation
export const isReservationOwnerOrCaterer: FunctionProps = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) throw createError("Authentication required", 401);

    // Caterers can access all reservations
    if (req.user.role === "caterer") {
      next();
      return;
    }

    // For customers, check if they own the reservation
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    if (!reservation) throw createError("Reservation not found", 404);

    if (reservation.customerId.toString() !== req.user.id)
      throw createError("Access denied. You don't own this reservation", 403);

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if user is authorized to access a specific payment
export const isPaymentOwnerOrCaterer: FunctionProps = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) throw createError("Authentication required", 401);

    // Caterers can access all payments
    if (req.user.role === "caterer") {
      next();
      return;
    }

    // For customers, check if they own the payment through the reservation
    let paymentId;
    if (req.params.id) {
      paymentId = req.params.id;
    } else if (req.params.paymentId) {
      paymentId = req.params.paymentId;
    } else if (req.params.reservationId) {
      // For reservation-based payment routes, we'll check the reservation ownership
      const reservation = await Reservation.findById(req.params.reservationId);

      if (!reservation) throw createError("Reservation not found", 404);

      if (reservation.customerId.toString() !== req.user.id)
        throw createError("Access denied. You don't own this reservation", 403);

      next();
      return;
    }

    if (!paymentId) throw createError("Payment ID is required", 400);

    const payment = await Payment.findById(paymentId);

    if (!payment) throw createError("Payment not found", 404);

    // Get the reservation to check ownership
    const reservation = await Reservation.findById(payment.reservationId);

    if (!reservation)
      throw createError("Associated reservation not found", 404);

    if (reservation.customerId.toString() !== req.user.id)
      throw createError("Access denied. You don't own this payment", 403);

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the user is authorized to access/edit their own profile
export const isSelf: FunctionProps = (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      throw createError(
        "Access denied. You can only access your own data",
        403
      );

    next();
  } catch (error) {
    next(error);
  }
};

export const isSelfOrCaterer: FunctionProps = (req, res, next) => {
  try {
    if (req.user.role === "caterer") {
      next();
      return;
    }

    if (req.user.id !== req.params.id)
      throw createError(
        "Access denied. You can only access your own data",
        403
      );

    next();
  } catch (error) {
    next(error);
  }
};
