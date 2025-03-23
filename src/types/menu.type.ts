import mongoose from "mongoose";

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

// Define the schemas for nested objects
export const NutritionInfoSchema = new mongoose.Schema({
  calories: { type: String, required: false },
  protein: { type: String, required: false },
  fat: { type: String, required: false },
  carbs: { type: String, required: false },
  sodium: { type: String, required: false },
  fiber: { type: String, required: false },
  sugar: { type: String, required: false },
  cholesterol: { type: String, required: false },
});

export const PriceInfoSchema = new mongoose.Schema({
  minimumPax: {
    type: Number,
    required: [true, "Please provide minimum number of people"],
  },
  maximumPax: {
    type: Number,
    required: [true, "Please provide maximum number of people"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price information"],
  },
});
