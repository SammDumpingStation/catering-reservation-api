import Payment from "@schemas/payment.schema.js";
import { PaymentProps } from "@TStypes/payment.type.js";

// Create a new payment
export const createPayment = async (paymentData: Partial<PaymentProps>) => {
  const payment = await Payment.create(paymentData);
  return payment;
};
