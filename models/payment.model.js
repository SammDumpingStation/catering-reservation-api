import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    transactions: [
      {
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
          enum: ["pending", "completed", "failed"],
          default: "pending",
        },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "partial", "full"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
