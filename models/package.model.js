import mongoose from "mongoose";

const eventTypeEnum = [
  "Birthday Party",
  "Wedding Reception",
  "Corporate Event",
  "Anniversary Celebration",
  "Debut",
  "Baptismal / Christening",
  "Family Reunion",
  "Graduation Party",
  "Christmas Party",
  "Engagement Party",
  "Bridal Shower",
  "Baby Shower",
  "Funeral / Memorial Service",
  "Housewarming Party",
];

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      enum: eventTypeEnum,
      required: [true, "Please provide an Event Type"],
    },

    pricingOptions: {
      pricePerPerson: {
        type: Number,
        required: [true, "Please provide price per person"],
      },
      totalPackagePrice: {
        type: Number,
      },
    },

    guestCapacity: {
      min: {
        type: Number,
        required: [true, "Please provide minimum guest capacity"],
      },
      max: {
        type: Number,
        required: [true, "Please provide maximum guest capacity"],
      },
    },
    includedMenus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: [true, "Please provide a menu under this package"],
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "https://placehold.co/600x400",
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
