import { NextFunction, Request, Response } from "express";
import Reservation from "../schemas/reservation.schema.js";
import { checkIfExists } from "../utils/checkExistence.js";

//Get All CatererReservation
const getCatererReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const catererId = req.user?.id
    const reservations = await Reservation.find();

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

//Get a CatererReservation
const getCatererReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    checkIfExists(reservation, "CatererReservation");

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

//Create a CatererReservation
const createCatererReservation = async (
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

//Update a CatererReservation
const updateCatererReservation = async (
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

    checkIfExists(reservation, "CatererReservation");

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};
//Delete a CatererReservation
const deleteCatererReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    checkIfExists(reservation, "CatererReservation");

    res.status(200).json({
      success: true,
      message: "CatererReservation deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getCatererReservations,
  getCatererReservation,
  createCatererReservation,
  updateCatererReservation,
  deleteCatererReservation,
};
