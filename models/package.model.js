import mongoose from "mongoose";

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
      minLength: 2,
      trim: true,
    },
    menu_items: {
      type: Array,
      required: true,
    },
    price_per_person: {
      type: Number,
      required: true,
      trim: true,
    },
    minimum_guests: {
      type: Number,
      required: true,
    },
    maximum_guests: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
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
