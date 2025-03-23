import mongoose from "mongoose";
import {
  ALLERGENS,
  CATEGORIES,
  MenuProps,
  NutritionInfoProps,
  PriceInfoProps,
} from "src/types/menu.type.js";

// Define the schemas for nested objects
const NutritionInfoSchema = new mongoose.Schema<NutritionInfoProps>({
  calories: String,
  protein: String,
  fat: String,
  carbs: String,
  sodium: String,
  fiber: String,
  sugar: String,
  cholesterol: String,
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
      validate: {
        validator: (value: string) => CATEGORIES.includes(value),
        message: (props) =>
          `${props.value} is not a valid category. Please select from the list of valid categories.`,
      },
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
    ingredients: [String],
    allergens: [
      {
        type: String,
        enum: {
          values: ALLERGENS,
          message: (props: { value: string }) =>
            `${props.value} is not a valid allergen. Please select from the list of valid allergens.`,
        },
      },
    ],
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
    nutritionInfo: {
      type: NutritionInfoSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Menu = mongoose.model("Menu", menuSchema);

// Export the model and constants
export default Menu;
