import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: True,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    logo_url: {
      type: String,
      default: "https://placehold.co/60x60",
    },
    banner_image_url: {
      type: String,
      default: "https://placehold.co/60x60",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const BusinessProfile = mongoose.model(
  "BusinessProfile",
  businessProfileSchema
);

export default BusinessProfile;
