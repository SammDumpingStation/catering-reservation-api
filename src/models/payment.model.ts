import Payment from "@schemas/payment.schema.js";
import Reservation from "@schemas/reservation.schema.js";
import { PaymentProps, TransactionsProps } from "@TStypes/payment.type.js";
import { createError } from "@utils/globalUtils.js";
import mongoose from "mongoose";

// Create a new payment
export const createPayment = async (paymentData: Partial<PaymentProps>) => {
  const payment = await Payment.create(paymentData);
  return payment;
};

// Get payment by ID
export const getPaymentById = async (id: string) => {
  const payment = await Payment.findById(id);

  if (!payment) throw createError("Payment not found", 404);

  return payment;
};

// Get payments by reservation ID
export const getPaymentsByReservationId = async (reservationId: string) => {
  const payments = await Payment.find({ reservationId }).populate(
    "reservationId"
  );

  if (!payments || payments.length === 0)
    throw createError("No payments found for this reservation", 404);

  return payments;
};

// Get all payments (for caterer)
export const getAllPayments = async () => {
  const payments = await Payment.find().populate("reservationId");
  return payments;
};

// Get payments by customer ID
export const getPaymentsByCustomerId = async (customerId: string) => {
  // We need to join with reservations to filter by customerId
  const payments = await Payment.aggregate([
    {
      $lookup: {
        from: "reservations",
        localField: "reservationId",
        foreignField: "_id",
        as: "reservation",
      },
    },
    {
      $match: {
        "reservation.customerId": new mongoose.Types.ObjectId(customerId),
      },
    },
    {
      $project: {
        reservation: 0, // Remove the joined reservation data from results
      },
    },
  ]);

  return payments;
};

// Add transaction to payment
export const addTransactionToPayment = async (
  paymentId: string,
  transactionData: TransactionsProps
) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) throw createError("Payment not found", 404);

  payment.transactions.push(transactionData);

  // Update payment status based on transactions
  const totalPaid = payment.transactions.reduce((sum, transaction) => {
    return transaction.status === "completed" ? sum + transaction.amount : sum;
  }, 0);

  // Get reservation details to check against total cost
  // First get the reservation ID
  const reservationId = payment.reservationId;

  // Then fetch the full reservation document
  const reservation = await Reservation.findById(reservationId);

  if (!reservation) throw createError("Associated reservation not found", 404);

  const totalCost = reservation.costDetails.totalReservationCost;

  // Update payment status based on total paid amount
  if (totalPaid >= totalCost) {
    payment.status = "completed";
  } else if (totalPaid > 0) {
    payment.status = "partial";
  } else {
    payment.status = "pending";
  }

  await payment.save();
  return payment;
};

// Update payment status
export const updatePaymentStatus = async (
  paymentId: string,
  status: string
) => {
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    { status },
    { new: true, runValidators: true }
  );

  if (!payment) throw createError("Payment not found", 404);

  return payment;
};

// Update transaction status
export const updateTransactionStatus = async (
  paymentId: string,
  transactionId: string,
  status: string
) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) throw createError("Payment not found", 404);

  // Find the transaction by ID in the transactions array
  const transactionIndex = payment.transactions.findIndex(
    (t) => t._id && t._id.toString() === transactionId
  );

  if (transactionIndex === -1) throw createError("Transaction not found", 404);

  // Update the transaction status
  payment.transactions[transactionIndex].status = status;

  // Recalculate payment status
  const totalPaid = payment.transactions.reduce((sum, transaction) => {
    return transaction.status === "completed" ? sum + transaction.amount : sum;
  }, 0);

  // Get reservation details to check against total cost
  // First get the reservation ID
  const reservationId = payment.reservationId;

  // Then fetch the full reservation document
  const reservation = await Reservation.findById(reservationId);

  if (!reservation) throw createError("Associated reservation not found", 404);

  const totalCost = reservation.costDetails.totalReservationCost;

  // Update payment status based on total paid amount
  if (totalPaid === totalCost) {
    payment.status = "completed";
  } else if (totalPaid > 0) {
    payment.status = "partial";
  } else {
    payment.status = "pending";
  }

  await payment.save();
  return payment;
};
