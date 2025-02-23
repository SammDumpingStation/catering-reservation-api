import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    account_details: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
