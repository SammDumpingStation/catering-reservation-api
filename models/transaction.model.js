import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount_due: {
      type: Number,
      required: true,
      trim: true,
    },
    amount_paid: {
      type: Number,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      required: true,
      trim: true,
    },
    min_down_payment: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "partially_paid", "paid", "refunded", "cancelled"],
    },
    reservation: {
      type: mongoose.Types.ObjectId,
      ref: "Reservation",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
