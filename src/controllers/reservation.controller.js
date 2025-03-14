import Reservation from "../models/reservation.model.js";
import { checkIfExists } from "../utils/check-if-exists.js";

//Get All Reservation
const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

//Get a Reservation
const getReservation = async (req, res, next) => {
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
const createReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.create(req.body);

    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

//Update a Reservation
const updateReservation = async (req, res, next) => {
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
const deleteReservation = async (req, res, next) => {
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
