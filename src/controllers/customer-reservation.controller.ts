import { NextFunction, Request, Response } from "express";
import Reservation from "../schemas/reservation.schema.js";
import { checkIfExists } from "../utils/checkExistence.js";

//Get All Customer Reservation
const getCustomerReservations = async (
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

//Get a Customer Reservation
const getCustomerReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    checkIfExists(reservation, "CustomerReservation");

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

//Create a Customer Reservation
const createCustomerReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservation = await Reservation.create(req.body);

    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export {
  getCustomerReservations,
  getCustomerReservation,
  createCustomerReservation,
};
