import Reservation from "@schemas/reservation.schema.js";
import * as reservationModel from "@models/reservation.model.js";
import { createError } from "@utils/globalUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";

// Get all reservations (For Caterer)
export const getAllReservations: FunctionProps = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({ success: true, data: reservations });
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

// Get a single reservation by ID
export const getReservation: FunctionProps = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await reservationModel.getReservationById(id);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// Get all reservations for the logged-in customer
export const getMyReservations: FunctionProps = async (req, res, next) => {
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
