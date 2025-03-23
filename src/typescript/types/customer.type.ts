import { Document, Types } from "mongoose";

export interface CustomerProps extends Document {
  fullName: string;
  email: string;
  password: string;
  contactNumber?: string;
  role: "customer" | "admin";
  profileImage?: string;
}

export interface updateCustomerProps {
  id: string;
  fullName: string;
  contactNumber: string;
  profileImage: string;
}
