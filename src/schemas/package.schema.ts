import {
  CateringPackagesProps,
  PACKAGE_CATEGORIES,
} from "@TStypes/package.type.js";
import mongoose from "mongoose";

const PackageOptionSchema = new mongoose.Schema({
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
});

const InclusionSchema = new mongoose.Schema({
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
});

const packageSchema = new mongoose.Schema<CateringPackagesProps>(
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
    pricePerPax: {
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
      type: [PackageOptionSchema],
      required: true,
    },
    inclusions: {
      type: [InclusionSchema],
      required: true,
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
    serviceHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    serviceCharge: {
      type: Number,
      default: 0,
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
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
