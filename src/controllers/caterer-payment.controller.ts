import { NextFunction, Request, Response } from "express";
import Payment from "../schemas/payment.schema.js";

import { checkIfExists } from "../utils/checkExistence.js";
import Reservation from "@schemas/reservation.schema.js";

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

// Add a new transaction to an existing payment
export const addTransaction = async (
  req: Request<{ paymentId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentId } = req.params;
    const { amount, method, type, status } = req.body;

    const checkPayment = await Payment.findById(paymentId);
    const payment = checkIfExists(checkPayment, "Payment");

    // Add new transaction
    payment.transactions.push({
      amount,
      method,
      type,
      status: status || "pending",
      date: new Date(),
    });

    // Update payment status
    const totalPaid = payment.transactions.reduce(
      (sum, trans) => sum + trans.amount,
      0
    );
    const reservation = await Reservation.findById(
      payment.reservationId
    ).select("totalPrice");

    if (totalPaid >= reservation!.costDetails.totalReservationCost) {
      payment.status = "completed";
    } else if (totalPaid > 0) {
      payment.status = "partial";
    }

    await payment.save();

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// Update payment status
export const updatePaymentStatus = async (
  req: Request<{ paymentId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    checkIfExists(payment, "Payment");

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// Update transaction status
export const updateTransactionStatus = async (
  req: Request<{ paymentId: string; transactionId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentId, transactionId } = req.params;
    const { status } = req.body;

    const payment = await Payment.findById(paymentId);
    checkIfExists(payment, "Payment");

    const findTransaction = payment!.transactions.find(
      (t) => t._id?.toString() === transactionId
    );
    const transaction = checkIfExists(findTransaction, "Tansaction");

    transaction.status = status;
    await payment!.save();

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};
