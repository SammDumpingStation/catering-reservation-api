import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    event_date: {
      type: Date,
      required: [true, "Event Date is required"],
    },
    event_time: {
      type: Date,
      required: [true, "Event Time is required"],
    },
    menu_items: {
      type: Array,
      required: [true, "Menu Items is required"],
    },
    guest_count: {
      type: Number,
      required: true,
      trim: true,
    },
    total_price: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Canceled"],
    },
    payment_type: {
      type: String,
      enum: ["Credit/Debit", "Cash"],
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
    },
    notes: {
      type: String,
      trim: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      index: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
