import { Document, Types } from "mongoose";
import { FoodCategoryProps, ReviewsProps } from "./global.type.js";

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

export type createPackageProps = (
  data: CateringPackagesProps
) => Promise<CateringPackagesProps>;

export type updatePackageByIdProps = (
  id: string,
  data: Partial<
    Omit<
      CateringPackagesProps,
      | "_id"
      | "rating"
      | "ratingCount"
      | "reviews"
      | "createdAt"
      | "updatedAt"
      | "__v"
    >
  >
) => Promise<CateringPackagesProps | null>;
