import mongoose from "mongoose";

export const PACKAGE_CATEGORIES = [
  "Soup",
  "Salad",
  "Beef",
  "Pork",
  "Noodle",
  "Chicken",
  "Seafood",
  "Vegetable",
  "Dessert",
  "Beverage",
];

const packageOptionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: PACKAGE_CATEGORIES,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const inclusionSchema = new mongoose.Schema(
  {
    typeOfCustomer: {
      type: String,
      enum: ["Both", "Plated", "Buffet"],
      required: true,
    },
    includes: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    pricePerPax: {
      type: Number,
      required: true,
    },
    pricePerPaxWithServiceCharge: {
      type: Number,
      required: true,
    },
    minimumPax: {
      type: Number,
      required: true,
    },
    recommendedPax: {
      type: Number,
      required: true,
    },
    maximumPax: {
      type: Number,
      required: true,
    },
    options: {
      type: [packageOptionSchema],
      required: true,
    },
    inclusions: {
      type: [inclusionSchema],
      required: true,
    },
    serviceHours: {
      type: Number,
      required: true,
      min: 0,
    },
    serviceCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    eventType: {
      type: String,
      enum: ["Birthday", "Wedding", "Corporate", "Graduation"],
      required: function () {
        return this.packageType === "Event"; // `eventType` is required only if `packageType` is "Event"
      },
    },
    packageType: {
      type: String,
      enum: ["BuffetPlated", "Event"],
      required: true, // Ensure this field is always defined
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
