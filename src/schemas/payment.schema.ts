import { statusEnums } from "@TStypes/global.type.js";
import {
  PaymentProps,
  paymentStatus,
  TransactionsProps,
} from "@TStypes/payment.type.js";
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema<TransactionsProps>({
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: [
      "online",
      "bank_transfer",
      "cash_on_delivery",
      "credit_card",
      "debit_card",
    ],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["down_payment", "additional_payment", "full_payment"],
    required: true,
  },
  status: {
    type: String,
    enum: statusEnums,
    default: "pending",
  },
});

const paymentSchema = new mongoose.Schema<PaymentProps>(
  {
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    transactions: [TransactionSchema],

    status: {
      type: String,
      enum: paymentStatus,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
