import Reservation from "@schemas/reservation.schema.js";
import { NextFunction, Request, Response } from "express";
import * as reservationModel from "@models/reservation.model.js";

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
