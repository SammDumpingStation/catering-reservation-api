import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    customer_email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    customer_phone: {
      type: Number,
      maxLength: 11,
      trim: true,
    },
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
