import { Types } from "mongoose";

export type ObjectId = Types.ObjectId;

export type StringEnums = string[];

export const statusEnums: StringEnums = [
  "pending",
  "confirmed",
  "completed",
  "canceled",
];