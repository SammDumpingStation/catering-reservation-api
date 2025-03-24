import { NextFunction, Request, Response } from "express";
import Payment from "../schemas/payment.schema.js";

import { checkIfExists } from "../utils/checkExistence.js";

// Get all payments across all reservations
export const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

// Get all payments for a specific reservation
export const getReservationPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.params;
    const reservations = await Payment.find({ reservationId }).populate(
      "reservationId",
      "fullName"
    );

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

// Get all payments from a specific customer
export const getCustomerPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;

    // Find payments where the reservation's customerId matches customerId
    const payments = await Payment.find().populate({
      path: "reservationId",
      match: { customerId: customerId }, // Filter reservations by customerId
      populate: { path: "customerId", select: "name email" }, // Populate user details
    });

    // Filter out payments where reservationId didn't match (will be null)
    const filteredPayments = payments.filter(
      (payment) => payment.reservationId !== null
    );

    // Check if any payments exist (adjust based on your checkIfExists logic)
    checkIfExists(filteredPayments, "Payment");

    res.status(200).json({ success: true, data: filteredPayments });
  } catch (error) {
    next(error);
  }
};

//Get a Payment
export const getPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    checkIfExists(Payment, "Payment");

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

//Create a Payment
export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await Payment.create(req.body);

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

//Delete a Payment
export const deletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByIdAndDelete(id);

    checkIfExists(payment, "Payment");

    res
      .status(200)
      .json({ success: true, message: "Payment deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};
