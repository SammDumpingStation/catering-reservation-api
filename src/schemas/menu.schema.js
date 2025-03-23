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
const NutritionInfoSchema = new mongoose.Schema({
  calories: { type: String },
  protein: { type: String },
  fat: { type: String },
  carbs: { type: String },
  sodium: { type: String },
  fiber: { type: String },
  sugar: { type: String },
  cholesterol: { type: String },
});

const PriceInfoSchema = new mongoose.Schema({
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
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide menu name"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: {
        values: CATEGORIES,
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
    ingredients: [{ type: String }],
    allergens: [
      {
        type: String,
        enum: {
          values: ALLERGENS,
          message: (props) =>
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
