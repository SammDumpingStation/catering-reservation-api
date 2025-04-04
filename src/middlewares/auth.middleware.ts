// middleware/auth.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env.js";
import Reservation from "@schemas/reservation.schema.js";
import Payment from "@schemas/payment.schema.js";
import { createError } from "@utils/globalUtils.js";

// Middleware Temporary as I dont Know if Caterer and Customer Reservations will be merged
interface DecodedToken extends JwtPayload {
  customerId: string;
  role: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw createError("Authentication required", 401);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded) throw createError("Invalid or expired token", 403);

    const { customerId, role } = decoded as DecodedToken;

    req.user = { id: customerId, role };
    // req.query.user isulod

    next();
  });
};

// Middleware to check if user is a caterer
export const isCaterer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "caterer")
    throw createError("Caterer access required", 403);

  next();
};

// Middleware to check if user is a customer
export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "customer")
    throw createError("Customer access required", 403);

  next();
};

// Middleware to check if user is authorized to access a specific reservation
export const isReservationOwnerOrCaterer = async (
  req: Request,
  res: Response,
  next: NextFunction
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
export const isPaymentOwnerOrCaterer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
export const isSelf = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw createError("Authentication required", 401);

    const requestedUserId = req.params.userId || req.params.id;

    if (!requestedUserId)
      throw createError("User ID is required in request", 400);

    if (req.user.id !== requestedUserId) {
      throw createError(
        "Access denied. You can only access your own profile",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
