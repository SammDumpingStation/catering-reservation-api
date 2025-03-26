import { NextFunction, Request, Response } from "express";
import Reservation from "../../schemas/reservation.schema.js";
import * as ReservationModel from "@models/considerations/caterer-reservation.model.js";

//Get all reservation from all customers (For Caterer)
const getAllReservations = async (
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

//Get all reservation made by a customer
const getCustomerReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const reservations = await ReservationModel.getCustomerReservationsById(
      customerId
    );
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

    const reservation = await ReservationModel.getCustomerReservationsById(id);

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
      customerDetails,
      eventDetails,
      menuSelection,
      specialRequests,
      costDetails,
      status,
      paymentStatus,
    } = req.body;

    const reservation = await ReservationModel.updateReservationById(id, {
      customerId,
      customerDetails,
      eventDetails,
      menuSelection,
      specialRequests,
      costDetails,
      status,
      paymentStatus,
    });

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

    await ReservationModel.deleteReservationById(id);

    res.status(200).json({
      success: true,
      message: "Reservation deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllReservations,
  getCustomerReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
