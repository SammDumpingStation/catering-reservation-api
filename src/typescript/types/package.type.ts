import { Document } from "mongoose";

export interface OptionProps {
  category: string;
  count: number;
}

export interface PackageProps extends Document {
  name: string;
  description: string;
  pricePerPax: number;
  minimumPax: number;
  recommendedPax: number;
  maximumPax: number;
  serviceHours: number;
  serviceCharge: number;
  options: OptionProps[];
  inclusions: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;
}
