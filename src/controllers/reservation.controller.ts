import Reservation from "@schemas/reservation.schema.js";
import * as reservationModel from "@models/reservation.model.js";
import { createError } from "@utils/globalUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";

// Get all reservations (For Caterer)
export const getReservations: FunctionProps = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

// Get a single reservation by Email
export const getReservation: FunctionProps = async (req, res, next) => {
  try {
    const reservation = await Reservation.find({ email: req.params.email });
    if (!reservation)
      throw createError("Reservation with this email doesn't exist", 404);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// Create a Reservation
export const postReservation: FunctionProps = async (req, res, next) => {
  try {
    const data = req.body;

    const reservation = await reservationModel.createReservation(data);

    res.status(201).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

// Update a Reservation
export const updateReservation: FunctionProps = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      throw createError("Update data cannot be empty", 400);
    }

    const reservation = await reservationModel.updateReservationById(id, data);
    if (!reservation) throw createError("Reservation doesn't exist", 404);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// Delete a Reservation
export const deleteReservation: FunctionProps = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) throw createError("Reservation doesn't exist", 404);

    res.status(200).json({
      success: true,
      message: `Reservation id ${req.params.id} is deleted Successfully!`,
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};
