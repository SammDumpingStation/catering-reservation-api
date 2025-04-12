import { Document, Types } from "mongoose";
import { FoodCategoryProps, ReviewsProps } from "./global.type.js";

export type PackageOptionProps = {
  category: FoodCategoryProps;
  count: number;
};

export type InclusionsProps = {
  typeOfCustomer: "Both" | "Buffet" | "Plated";
  includes: string;
};

export type EventProps = "Birthday" | "Wedding" | "Corporate" | "Graduation";

export type PackageProps = "BuffetPlated" | "Event";

export interface ICateringPackages extends Document {
  name: string;
  description: string;
  available: boolean;
  pricePerPax: number;
  pricePerPaxWithServiceCharge: number;
  minimumPax: number;
  recommendedPax: number;
  maximumPax: number;
  options: PackageOptionProps[];
  inclusions: InclusionsProps[];
  serviceHours: number;
  serviceCharge: number;
  eventType?: EventProps;
  packageType: PackageProps;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  reviews?: ReviewsProps[];
}

export type CreatePackageProps = (
  data: ICateringPackages
) => Promise<ICateringPackages>;

export type UpdatePackageByIdProps = (
  id: string,
  data: Partial<
    Omit<
      ICateringPackages,
      | "_id"
      | "rating"
      | "ratingCount"
      | "reviews"
      | "createdAt"
      | "updatedAt"
      | "__v"
    >
  >
) => Promise<ICateringPackages | null>;
