import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    phone: {
      type: Number,
      maxLength: 11,
      trim: true,
    },
    message: {
      type: String,
      minLength: 5,
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Replied", "Closed"],
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
