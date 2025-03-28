import mongoose from "mongoose";
import {
  ALLERGENS,
  CATEGORIES,
  MenuProps,
  NutritionInfoProps,
  PriceInfoProps,
} from "@TStypes/menu.type.js";

// Define the schemas for nested objects
const NutritionInfoSchema = new mongoose.Schema<NutritionInfoProps>({
  calories: { type: String, default: "0 kcal" },
  protein: { type: String, default: "0 g" },
  fat: { type: String, default: "0 g" },
  carbs: { type: String, default: "0 g" },
  sodium: { type: String, default: "0 mg" },
  fiber: { type: String, default: "0 g" },
  sugar: { type: String, default: "0 g" },
  cholesterol: { type: String, default: "0 mg" },
});

const PriceInfoSchema = new mongoose.Schema<PriceInfoProps>({
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

// Define the main Menu schema
const menuSchema = new mongoose.Schema<MenuProps>(
  {
    name: {
      type: String,
      required: [true, "Please provide menu name"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: CATEGORIES, // Use enum as an array directly
    },
    available: {
      type: Boolean,
      default: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide a short description"],
    },
    fullDescription: {
      type: String,
      required: [true, "Please provide a full description"],
    },
    ingredients: {
      type: [String],
      required: [true, "Please provide the ingredients."],
    },
    allergens: {
      type: [String],
      enum: [...ALLERGENS, "None"],
      default: ["None"],
    },
    preparationMethod: {
      type: String,
      required: [true, "Please provide preparation method"],
    },
    prices: [PriceInfoSchema],
    regularPricePerPax: {
      type: Number,
      required: [true, "Please provide regular price per person"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    spicy: {
      type: Boolean,
      default: false,
    },
    perServing: {
      type: String,
      required: [true, "Please provide serving size information"],
    },
    nutritionInfo: NutritionInfoSchema,
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Menu = mongoose.model("Menu", menuSchema);

// Export the model and constants
export default Menu;
