import Reservation from "@schemas/reservation.schema.js";
import { NextFunction, Request, Response } from "express";
import * as paymentModel from "@models/payment.model.js";
import { createError } from "@utils/globalUtils.js";

// Create a new payment
export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId, transactions } = req.body;

    // Verify reservation exists
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) throw createError("Reservation not found", 404);

    const payment = await paymentModel.createPayment({
      reservationId,
      transactions: transactions || [],
      status: transactions && transactions.length > 0 ? "partial" : "pending",
    });

    // Update reservation payment status if needed
    if (payment.status !== "pending") {
      await Reservation.findByIdAndUpdate(reservationId, {
        paymentStatus: payment.status,
      });
    }

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return next(error);
  }
};

// Get all payments (for caterer)
export const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payments = await paymentModel.getAllPayments();

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

// Get payment by ID
export const getPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const payment = await paymentModel.getPaymentById(id);

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// Get payments by reservation ID
export const getPaymentsByReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.params;

    const payments = await paymentModel.getPaymentsByReservationId(
      reservationId
    );

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

// Get my payments (for customer)
export const getMyPayments = async (
  req: Request & { user?: { id: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.user?.id;

    if (!customerId) throw createError("User not authenticated", 401);

    const payments = await paymentModel.getPaymentsByCustomerId(customerId);

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    return next(error);
  }
};

// Add transaction to payment
export const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const transactionData = req.body;

    // Validate transaction data
    if (
      !transactionData.amount ||
      !transactionData.method ||
      !transactionData.type
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide amount, method, and type for the transaction",
      });
      return;
    }

    const payment = await paymentModel.addTransactionToPayment(
      id,
      transactionData
    );

    // Update reservation payment status
    await Reservation.findByIdAndUpdate(payment.reservationId, {
      paymentStatus: payment.status,
    });

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return next(error);
  }
};

// Update payment status
export const updatePaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) throw createError("Please provide status", 400);

    const payment = await paymentModel.updatePaymentStatus(id, status);

    // // Update reservation payment status || STILL I DONT KNOW IF THE RESERVATION NEEDS TO HAVE PAYMENT STATUS
    // const updateReservationStatus = await Reservation.findByIdAndUpdate(payment.reservationId, {
    //   paymentStatus: status,
    // });

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return next(error);
  }
};

// Update transaction status
export const updateTransactionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentId, transactionId } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({
        success: false,
        message: "Please provide status",
      });
      return;
    }

    const payment = await paymentModel.updateTransactionStatus(
      paymentId,
      transactionId,
      status
    );

    // Update reservation payment status
    await Reservation.findByIdAndUpdate(payment.reservationId, {
      paymentStatus: payment.status,
    });

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return next(error);
  }
};
