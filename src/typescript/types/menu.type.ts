import { Document } from "mongoose";
import {
  FoodAllergenProps,
  FoodCategoryProps,
  ReviewsProps,
} from "./global.type.js";

// Define interfaces for nested schemas
export type NutritionInfoProps = {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  sodium: string;
  fiber: string;
  sugar: string;
  cholesterol: string;
};

export type PriceInfoProps = {
  minimumPax: number;
  maximumPax: number;
  price: number;
  discount: number;
};

export interface IMenu extends Document {
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

export type CreateMenuProps = (data: IMenu) => Promise<IMenu>;

export type UpdateMenuByIdProps = (
  id: string,
  data: Partial<
    Omit<
      IMenu,
      | "_id"
      | "rating"
      | "ratingCount"
      | "reviews"
      | "createdAt"
      | "updatedAt"
      | "__v"
    >
  >
) => Promise<IMenu | null>;
