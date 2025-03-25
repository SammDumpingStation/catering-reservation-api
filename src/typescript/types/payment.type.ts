import { Document } from "mongoose";
import { ObjectId, statusEnums, StringEnums } from "./global.type.js";

export const paymentStatus: StringEnums = ["pending", "partial", "full"];
export interface TransactionsProps {
  _id?: ObjectId;
  amount: number;
  method: {
    type: string;
    enum: string[];
    required: boolean;
  };
  date: Date;
  type: string;
  status: (typeof statusEnums)[number];
}
export interface PaymentProps extends Document {
  reservationId: ObjectId;
  transactions: TransactionsProps[];
  status: (typeof paymentStatus)[number];
}
