import Reservation from "@schemas/reservation.schema.js";
import { NextFunction, Request, Response } from "express";
import * as reservationModel from "@models/reservation.model.js";
import { createError } from "@utils/authUtils.js";

// Get all reservations (For Caterer)
export const getAllReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

// Get all reservations for a specific customer
export const getCustomerReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const reservations = await reservationModel.getReservationsByCustomerId(id);

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

// Get a single reservation by ID
export const getReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const reservation = await reservationModel.getReservationById(id);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// Get all reservations for the logged-in customer
export const getMyReservations = async (
  req: Request & { user?: { id: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    // Assuming req.user is set by authentication middleware
    const customerId = req.user?.id;

    if (!customerId) throw createError("User not authenticated", 401);

    const reservations = await reservationModel.getReservationsByCustomerId(
      customerId
    );
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    return next(error);
  }
};
