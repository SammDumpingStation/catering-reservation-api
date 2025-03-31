import { Document } from "mongoose";
import { FoodAllergenProps, FoodCategoryProps } from "./global.type.js";

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
}

export interface MenuProps extends Document {
  name: string;
  category: FoodCategoryProps;
  available: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: FoodAllergenProps[];
  preparationMethod: string;
  prices: PriceInfoProps[];
  regularPricePerPax: number;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  spicy?: boolean;
  perServing: string;
  nutritionInfo?: NutritionInfoProps;
}
