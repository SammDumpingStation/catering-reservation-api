import { FoodCategoryProps, statusEnums } from "@TStypes/global.type.js";
import {
  beefOptions,
  beverageOptions,
  chickenOptions,
  CostDetailsProps,
  CustomerDetailsProps,
  dessertOptions,
  EventDetailsProps,
  noodleOptions,
  porkOptions,
  ReservationProps,
  saladOptions,
  seafoodOptions,
  soupOptions,
  vegetableOptions,
} from "@TStypes/reservation.type.js";
import mongoose from "mongoose";

const CustomerDetailsSchema = new mongoose.Schema<CustomerDetailsProps>({
  firstName: {
    type: String,
    required: [true, "Please provide your First Name"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your surname"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Please provide your email address"],
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Please provide contact number"],
    trim: true,
  },
});

const EventDetailsSchema = new mongoose.Schema<EventDetailsProps>({
  type: {
    type: String,
    default: "birthday",
  },
  date: {
    type: Date,
    required: [true, "Please provide event date"],
  },
  time: {
    type: Date,
    required: [true, "Please provide event time"],
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 30,
  },
  venue: {
    type: String,
    required: [true, "Please provide the venue"],
  },
  serviceType: {
    type: String,
    enum: ["Plated Service", "Buffet"],
    required: true,
    default: "Buffet",
  },
  serviceHours: {
    type: Number,
    enum: [4, 5, 6, 8, 10],
    required: true,
    default: 4,
  },
});

interface MenuSelectionProps {
  [category: FoodCategoryProps]: {
    type: mongoose.Types.ObjectId[];
    ref: "Menu";
  }[];
}

const MenuSelectionSchema = new mongoose.Schema<MenuSelectionProps>(
  {
    // This is a map where keys are category names and values are arrays of ObjectIds
    // We don't define specific fields, but we tell Mongoose about the expected structure
  },
  {
    strict: false, // Allow fields not explicitly defined in the schema
    _id: false,
    typeKey: "$type", // Avoid conflicts with Mongoose's 'type' keyword
  }
);

// Temporary comment
// const MenuSelectionSchema = new mongoose.Schema<MenuSelectionProps>({
//   soupOptions: {
//     type: [String],
//     enum: soupOptions,
//     default: [],
//   },
//   saladOptions: {
//     type: [String],
//     enum: saladOptions,
//   },
//   chickenOptions: {
//     type: [String],
//     enum: chickenOptions,
//   },
//   porkOptions: {
//     type: [String],
//     enum: porkOptions,
//   },
//   beefOptions: {
//     type: [String],
//     enum: beefOptions,
//   },
//   seafoodOptions: {
//     type: [String],
//     enum: seafoodOptions,
//   },
//   vegetableOptions: {
//     type: [String],
//     enum: vegetableOptions,
//   },
//   noodleOptions: {
//     type: [String],
//     enum: noodleOptions,
//   },
//   dessertOptions: {
//     type: [String],
//     enum: dessertOptions,
//   },
//   beverageOptions: {
//     type: [String],
//     enum: beverageOptions,
//   },
// });

const CostDetailsSchema = new mongoose.Schema<CostDetailsProps>({
  totalReservationCost: {
    type: Number,
    required: true,
  },
  minimumDownPayment: {
    type: Number,
    required: true,
  },
  downPaymentPaid: {
    type: Number,
    required: true,
  },
});

const reservationSchema = new mongoose.Schema<ReservationProps>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
    customerDetails: CustomerDetailsSchema,
    eventDetails: EventDetailsSchema,
    menuSelection: MenuSelectionSchema,
    specialRequests: {
      type: String,
      trim: true,
    },
    costDetails: CostDetailsSchema,
    status: {
      type: String,
      enum: statusEnums,
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: statusEnums,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
