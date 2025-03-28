import { NextFunction, Request, Response } from "express";
import Reservation from "../../schemas/reservation.schema.js";
import * as CustomerReservation from "@models/considerations/customer-reservation.model.js";

//Get All Customer Reservation
const getAllCustomerOwnReservations = async (
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

    const reservation = await CustomerReservation.getCustomerOwnReservations(
      id
    );
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
  getAllCustomerOwnReservations,
  getCustomerReservation,
  createCustomerReservation,
};
