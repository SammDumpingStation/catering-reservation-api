import { NextFunction, Request, Response } from "express";
import Reservation from "../schemas/reservation.schema.js";
import { checkIfExists } from "../utils/checkExistence.js";

//Get All Reservation
const getReservations = async (
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

//Get a Reservation
const getReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    checkIfExists(reservation, "Reservation");

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

//Create a Reservation
const createReservation = async (
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

//Update a Reservation
const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      customerId,
      customer_details,
      eventDetails,
      cateringPreferences,
      costDetails,
      paymentId,
      notes,
      status,
    } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      {
        customerId,
        customer_details,
        eventDetails,
        cateringPreferences,
        costDetails,
        paymentId,
        notes,
        status,
      },
      { new: true, runValidators: true }
    );

    checkIfExists(reservation, "Reservation");

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};
//Delete a Reservation
const deleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    checkIfExists(reservation, "Reservation");

    res
      .status(200)
      .json({ success: true, message: "Reservation deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};

export {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
