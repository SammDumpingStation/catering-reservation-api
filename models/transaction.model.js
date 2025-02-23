import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount_paid: {
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
      enum: ["Pending", "Completed", "Refunded", "Failed"],
    },
    payment_method: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
      index: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
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
