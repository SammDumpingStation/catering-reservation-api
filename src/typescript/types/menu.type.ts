import { Document } from "mongoose";
import {
  FoodAllergenProps,
  FoodCategoryProps,
  ReviewsProps,
} from "./global.type.js";

// Define interfaces for nested schemas
export interface NutritionInfoProps {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  sodium: string;
  fiber: string;
  sugar: string;
  cholesterol: string;
}

export interface PriceInfoProps {
  minimumPax: number;
  maximumPax: number;
  price: number;
  discount: number;
}

export interface MenuProps extends Document {
  name: string;
  category: FoodCategoryProps;
  available: boolean;
  spicy: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: FoodAllergenProps[];
  preparationMethod: string;
  regularPricePerPax: number;
  prices: PriceInfoProps[];
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  perServing: string;
  nutritionInfo?: NutritionInfoProps;
  reviews?: ReviewsProps[];
}

export type CreateMenuProps = (data: MenuProps) => Promise<MenuProps>;

export type UpdateMenuByIdProps = (
  id: string,
  data: Partial<
    Omit<
      MenuProps,
      | "_id"
      | "rating"
      | "ratingCount"
      | "reviews"
      | "createdAt"
      | "updatedAt"
      | "__v"
    >
  >
) => Promise<MenuProps | null>;
