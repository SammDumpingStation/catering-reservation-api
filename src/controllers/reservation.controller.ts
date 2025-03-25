import Reservation from "@schemas/reservation.schema.js";
import { NextFunction, Request, Response } from "express";

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
