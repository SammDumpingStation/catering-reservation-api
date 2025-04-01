import { Types } from "mongoose";

export type ObjectId = Types.ObjectId;

export type StringEnums = string[];

export const statusEnums: StringEnums = [
  "pending",
  "confirmed",
  "completed",
  "canceled",
];

export const FOOD_CATEGORIES = [
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

export const FOOD_ALLERGENS = [
  "None",
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
  "Gluten",
  "Mustard",
  "Celery",
  "Lupin",
  "Molluscs",
  "Sulphites",
  "Soy",
  "Nuts",
];

// TypeScript types for enums
export type FoodCategoryProps = (typeof FOOD_CATEGORIES)[number];
export type FoodAllergenProps = (typeof FOOD_ALLERGENS)[number];

export type ReviewsProps = {
  rating: number;
  comment: string;
  userId: Types.ObjectId;
};
