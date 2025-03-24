import mongoose from "mongoose";
import { CustomerProps } from "@TStypes/customer.type.js";

const customerSchema = new mongoose.Schema<CustomerProps>(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is Required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: 6,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "caterer"],
      default: "customer",
    },
    profileImage: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
