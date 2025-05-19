import {
  IReservation,
  MenuReservationDetails,
} from "@TStypes/reservation.type.js";
import mongoose from "mongoose";

// Define the schema for MenuReservationDetails
const menuReservationDetailsSchema =
  new mongoose.Schema<MenuReservationDetails>(
    {
      quantity: { type: Number, required: true },
      paxSelected: {
        type: String,
        enum: ["4-6 pax", "8-10 pax", "13-15 pax", "18-20 pax"],
        required: true,
      },
      pricePerPax: { type: Number, required: true },
    },
    {
      _id: false,
    }
  );

const reservationSchema = new mongoose.Schema<IReservation>(
  {
    fullName: { type: String, required: true, minLength: 2, maxLength: 50 },
    email: {
      type: String,
      required: [true, "Email is Required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    contactNumber: { type: String, required: true, trim: true },
    selectedPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    selectedMenus: {
      type: Map,
      of: {
        type: Map,
        of: menuReservationDetailsSchema,
      },
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Birthday", "Wedding", "Corporate", "Graduation", "Others"],
      required: true,
    },
    guestCount: { type: Number, required: true },
    serviceType: {
      type: String,
      enum: ["Buffet", "Plated"],
      required: true,
    },
    orderType: {
      type: String,
      enum: ["Pickup", "Delivery", ""],
      required: function () {
        return this.serviceType === "Buffet"; // `orderType` is required only if `serviceType` is "Buffet"
      },
    },
    reservationDate: { type: Date, required: true },
    reservationTime: { type: String, trim: true, required: true },
    deliveryFee: {
      type: Number,
      required: function () {
        return this.orderType === "Delivery";
      },
    },
    deliveryAddress: {
      type: String,
      trim: true,
      required: function () {
        return this.orderType === "Delivery";
      },
    },
    deliveryInstructions: { type: String, trim: true },
    totalPrice: { type: Number, required: true },
    specialRequests: { type: String, trim: true },
    venue: {
      type: String,
      trim: true,
      required: function () {
        return this.serviceType === "Plated";
      },
    },
    serviceFee: { type: Number, required: true },
    serviceHours: {
      type: String,
      enum: [
        "4 hours",
        "4.5 hours",
        "5 hours",
        "5.5 hours",
        "6 hours",
        "6.5 hours",
        "8 hours",
        "8.5 hours",
        "10 hours",
      ],
      required: function () {
        return this.serviceType === "Plated";
      },
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
