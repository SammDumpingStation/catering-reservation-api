import mongoose from "mongoose";

const operatingHoursSchema = new mongoose.Schema(
  {
    days: {
      type: Array,
      required: true,
    },
    open_time: {
      type: Date,
      required: true,
    },
    close_time: {
      type: Date,
      required: true,
    },
    is_closed: {
      type: Boolean,
    },
    business_profile: {
      type: mongoose.Types.ObjectId,
      ref: "BusinessProfile",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const OperatingHours = mongoose.model("OperatingHours", operatingHoursSchema);

export default OperatingHours;
