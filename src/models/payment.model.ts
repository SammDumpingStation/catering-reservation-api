import Payment from "@schemas/payment.schema.js";
import { PaymentProps } from "@TStypes/payment.type.js";
import { createError } from "@utils/authUtils.js";

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
