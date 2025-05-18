import {
  IReservation,
  MenuReservationDetails,
} from "@TStypes/reservation.type.js";
import mongoose from "mongoose";

// Define the schema for MenuReservationDetails
const MenuReservationDetailsSchema =
  new mongoose.Schema<MenuReservationDetails>({
    quantity: { type: Number, required: true },
    paxSelected: {
      type: String,
      enum: ["4-6 pax", "8-10 pax", "13-15 pax", "18-20 pax"],
      required: true,
    },
    pricePerPax: { type: Number, required: true },
  });

// Since SelectedMenus is Record<string, Record<string, MenuReservationDetails>>
// We’ll store it as an object with nested objects.
const ReservationSchema = new mongoose.Schema<IReservation>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    selectedPackage: { type: String, required: true },
    selectedMenus: {
      type: Map,
      of: {
        type: Map,
        of: MenuReservationDetailsSchema,
      },
      required: true,
    },
    eventType: { type: String, required: true },
    guestCount: { type: Number, required: true },
    serviceType: {
      type: String,
      enum: ["Buffet", "Plated"],
      required: true,
    },
    orderType: {
      type: String,
      enum: ["Pickup", "Delivery", ""],
      required: true,
    },
    reservationDate: { type: Date, required: true },
    reservationTime: { type: String, required: true },
    deliveryFee: { type: Number },
    deliveryAddress: { type: String },
    deliveryInstructions: { type: String },
    totalPrice: { type: Number, required: true },
    specialRequests: { type: String },
    venue: { type: String, required: true },
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
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);

export default Reservation;
