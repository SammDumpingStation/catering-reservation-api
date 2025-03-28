import { Document } from "mongoose";

// Define enum constants
export const CATEGORIES = [
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

export const ALLERGENS = ["Gluten", "Milk", "Eggs", "Nuts", "Shellfish", "Soy"];

// TypeScript types for enums
type CategoryProps = (typeof CATEGORIES)[number];
type AllergenProps = (typeof ALLERGENS)[number];

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
  category: CategoryProps;
  available: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens?: AllergenProps[];
  preparationMethod: string;
  prices: PriceInfoProps[];
  regularPricePerPax: number;
  imageUrl: string;
  rating?: number;
  ratingCount?: number;
  spicy?: boolean;
  perServing: string;
  nutritionInfo?: NutritionInfoProps;
}
