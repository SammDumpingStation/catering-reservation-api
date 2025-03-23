import { Document } from "mongoose";

interface CustomerProps extends Document {
  fullName: string;
  email: string;
  password: string;
  contactNumber?: string;
  role: "customer" | "admin";
  profileImage?: string;
}
