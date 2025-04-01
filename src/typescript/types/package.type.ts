import { Document, Types } from "mongoose";
import { FoodCategoryProps } from "./global.type.js";

export interface PackageOption {
  category: FoodCategoryProps;
  count: number;
}

export type InclusionsProps = {
  typeOfCustomer: "Both" | "Plated" | "Buffet";
  includes: string;
};

export type EventType = "Birthday" | "Wedding" | "Corporate" | "Graduation";

export type PackageType = "BuffetPlated" | "Event";

export type ReviewsProps = {
  rating: number;
  comment: string;
  userId: Types.ObjectId;
};

export interface CateringPackagesProps extends Document {
  name: string;
  description: string;
  available: boolean;
  pricePerPax: number;
  pricePerPaxWithServiceCharge: number;
  minimumPax: number;
  recommendedPax: number;
  maximumPax: number;
  options: PackageOption[];
  inclusions: InclusionsProps[];
  serviceHours: number;
  serviceCharge: number;
  eventType?: EventType;
  packageType: PackageType;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  reviews?: ReviewsProps[];
}
