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

// Get a single reservation by ID
export const getReservation: FunctionProps = async (req, res, next) => {
  try {
    const reservation = await reservationModel.getReservationById(
      req.params.id
    );
    if (!reservation) throw createError("Reservation doesn't exist", 404);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// Create a Reservation
export const createReservation: FunctionProps = async (req, res, next) => {
  try {
    // For customer-created reservations, ensure customerId is set to the logged-in user
    if (req.user && !req.body.customerId) {
      req.body.customerId = req.user.id;
    }

    const reservation = await Reservation.create(req.body);
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// Get all reservations for a specific customer
export const getCustomerReservations: FunctionProps = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const reservations = await reservationModel.getReservationsByCustomerId(id);

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

// Update a Reservation
export const updateReservation: FunctionProps = async (req, res, next) => {
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

    const reservation = await reservationModel.updateReservationById(id, {
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

// Delete a Reservation
export const deleteReservation: FunctionProps = async (req, res, next) => {
  try {
    const { id } = req.params;

    await reservationModel.deleteReservationById(id);

    res.status(200).json({
      success: true,
      message: "Reservation deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};
