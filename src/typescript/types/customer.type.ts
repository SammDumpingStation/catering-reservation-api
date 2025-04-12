import { Document } from "mongoose";

export interface ICustomer extends Document {
  fullName: string;
  email: string;
  password: string;
  contactNumber?: string;
  role: "customer" | "admin";
  profileImage?: string;
}

export type UpdateCustomerProps = (
  id: string,
  data: Partial<Omit<ICustomer, "_id" | "createdAt" | "updatedAt" | "__v">>
) => Promise<ICustomer | null>;
