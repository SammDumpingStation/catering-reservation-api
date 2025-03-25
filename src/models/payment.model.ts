import Payment from "@schemas/payment.schema.js";
import { PaymentProps } from "@TStypes/payment.type.js";
import { createError } from "@utils/authUtils.js";
import mongoose from "mongoose";

// Create a new payment
export const createPayment = async (paymentData: Partial<PaymentProps>) => {
  const payment = await Payment.create(paymentData);
  return payment;
};

// Get payment by ID
export const getPaymentById = async (id: string) => {
  const payment = await Payment.findById(id).populate("reservationId");

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
