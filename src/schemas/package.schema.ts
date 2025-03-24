import { OptionProps, PackageProps } from "@TStypes/package.type.js";
import mongoose from "mongoose";

const OptionsSchema = new mongoose.Schema<OptionProps>({
  category: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const packageSchema = new mongoose.Schema<PackageProps>(
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
    serviceHours: {
      type: Number,
      required: true,
    },
    serviceCharge: {
      type: Number,
      required: true,
    },
    options: {
      type: [OptionsSchema],
      required: true,
    },
    inclusions: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    ratingCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
