import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    customer_details: {
      firstName: {
        type: String,
        trim: [true, "Please provide your First Name"],
        minLength: 2,
        maxLength: 50,
      },
      lastName: {
        type: String,
        trim: [true, "Please provide your surname"],
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
    },

    eventDetails: {
      date: {
        type: Date,
        required: [true, "Please provide event date"],
      },
      time: {
        type: Date,
        required: [true, "Please provide event time"],
      },
      venue: {
        type: String,
        required: [true, "Please provide the venue"],
      },
    },

    cateringPreferences: {
      selectedPackage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        default: null,
      },
      customMenu: {
        selectedMenus: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
          },
        ],
        default: [],
      },
      numberOfGuests: {
        type: Number,
        required: [true, "Please provide a number of guests"],
        minLength: [30, "Minimum of 30 guests"],
      },
      additionalRequests: {
        type: Number,
        required: true,
      },
    },

    costDetails: {
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
      balanceDue: {
        type: Number,
        default: function () {
          return this.totalReservationCost - this.downPaymentPaid;
        },
      },
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    notes: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
