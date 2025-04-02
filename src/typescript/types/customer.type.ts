import { ObjectId } from "mongodb";
import mongoose, { Document, Types } from "mongoose";

export interface CustomerProps extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  contactNumber?: string;
  role: "customer" | "admin";
  profileImage?: string;
}

export interface CustomerPropsDummy {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  contactNumber?: string;
  role: "customer" | "admin";
  profileImage?: string;
}

export type updateCustomerProps = (
  id: string,
  data: {
    fullName: string;
    email: string;
    password: string;
    contactNumber: string;
    profileImage: string;
  }
) => Promise<CustomerProps | null>;
