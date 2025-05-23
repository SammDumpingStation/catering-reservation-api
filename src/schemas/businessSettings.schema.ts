import { IBusinessSettings } from "@TStypes/businessSettings.type.js";
import mongoose from "mongoose";

const socialMediaLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: [true, "Platform is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
  },
  { _id: false }
);

const mapSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: [true, "Map link is required"],
      trim: true,
    },
    embeddedLink: {
      type: String,
      required: [true, "Embedded map link is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Map address is required"],
      trim: true,
    },
  },
  { _id: false }
);

const businessSettingsSchema = new mongoose.Schema<IBusinessSettings>(
  {
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    map: mapSchema,
    tagline: {
      type: String,
      required: [true, "Tagline is required"],
      trim: true,
    },
    systemName: {
      type: String,
      required: [true, "System name is required"],
      trim: true,
    },
    businessLogo: {
      type: String,
      trim: true,
    },
    businessHours: {
      type: String,
      required: [true, "Business hours is required"],
    },
    businessDays: {
      type: String,
      required: [true, "Business days is required"],
    },
    socialMediaLinks: {
      type: [socialMediaLinkSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const BusinessSettings = mongoose.model(
  "BusinessSettings",
  businessSettingsSchema
);

export default BusinessSettings;
