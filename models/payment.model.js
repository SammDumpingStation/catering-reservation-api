import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount_paid: {
      type: Number,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["down_payment", "full_payment", "additional_payment"],
    },
    method: {
      type: String,
      required: true,
      enum: ["GCash", "Bank Transfer", "Cash"],
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed", "refunded"],
    },
    reference: {
      type: String,
    },
    receipt: {
      type: String,
      required: true,
    },
    transaction: {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
