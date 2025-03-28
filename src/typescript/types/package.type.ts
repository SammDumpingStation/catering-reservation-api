import { Document } from "mongoose";

export type PackageCategory =
  | "Soup"
  | "Salad"
  | "Beef"
  | "Pork"
  | "Noodle"
  | "Chicken"
  | "Seafood"
  | "Vegetable"
  | "Dessert"
  | "Beverage";

export const PACKAGE_CATEGORIES: PackageCategory[] = [
  "Soup",
  "Salad",
  "Beef",
  "Pork",
  "Noodle",
  "Chicken",
  "Seafood",
  "Vegetable",
  "Dessert",
  "Beverage",
];

export interface PackageOption {
  category: PackageCategory;
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
  minimumPax: number;
  recommendedPax: number;
  maximumPax: number;
  options: PackageOption[];
  inclusions: InclusionsProps[];
  imageUrl?: string;
  // imageFile?: Blob; NOT NECESSARY
  rating?: number;
  ratingCount?: number;
  serviceHours?: number;
  serviceCharge?: number;
  eventType?: EventType;
  packageType: PackageType;
}
