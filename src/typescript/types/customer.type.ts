import { Document, Types } from "mongoose";

export interface CustomerProps extends Document {
  fullName: string;
  email: string;
  password: string;
  contactNumber?: string;
  role: "customer" | "admin";
  profileImage?: string;
}

export type CustomerIdProps = {
  id: Types.ObjectId;
};

export interface updateCustomerProps extends CustomerIdProps {
  fullName: string;
  contactNumber: string;
  profileImage: string;
}
