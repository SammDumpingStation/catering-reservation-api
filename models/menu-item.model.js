import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu Name is Required"],
      minLength: 2,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      required: [true, "The Menu Photo is required"],
      default: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
