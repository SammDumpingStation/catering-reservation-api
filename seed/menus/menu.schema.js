import mongoose from "mongoose";

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
const nutritionInfoSchema = new mongoose.Schema(
  {
    calories: { type: String, default: "0 kcal", trim: true },
    protein: { type: String, default: "0 g", trim: true },
    fat: { type: String, default: "0 g", trim: true },
    carbs: { type: String, default: "0 g", trim: true },
    sodium: { type: String, default: "0 mg", trim: true },
    fiber: { type: String, default: "0 g", trim: true },
    sugar: { type: String, default: "0 g", trim: true },
    cholesterol: { type: String, default: "0 mg", trim: true },
  },
  { _id: false }
);

const priceInfoSchema = new mongoose.Schema(
  {
    minimumPax: {
      type: Number,
      required: true,
    },
    maximumPax: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
  },
  { _id: false }
);

// Define the main Menu schema
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
      trim: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    spicy: {
      type: Boolean,
      required: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide a short description"],
      trim: true,
      minLength: [10, "Short description must be at least 10 characters long"],
      maxLength: [200, "Short description must not exceed 200 characters"],
    },
    fullDescription: {
      type: String,
      required: [true, "Please provide a full description"],
      trim: true,
      minLength: [30, "Full description must be at least 30 characters long"],
      maxLength: [500, "Full description must not exceed 500 characters"],
    },
    ingredients: {
      type: [String],
      required: [true, "Please provide the ingredients."],
    },
    allergens: {
      type: [String],
      enum: [...ALLERGENS],
      default: ["None"],
    },
    preparationMethod: {
      type: String,
      required: [true, "Please provide preparation method"],
      trim: true,
    },
    regularPricePerPax: {
      type: Number,
      required: [true, "Please provide regular price per person"],
    },
    prices: {
      type: [priceInfoSchema],
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    perServing: {
      type: String,
      required: [true, "Please provide serving size information"],
      trim: true,
    },
    nutritionInfo: nutritionInfoSchema,
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Menu = mongoose.model("Menu", menuSchema);

// Export the model and constants
export default Menu;
