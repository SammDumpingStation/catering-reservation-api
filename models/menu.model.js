import mongoose from "mongoose";

const dietaryInfoEnum = [
  "Vegan",
  "Vegetarian",
  "Halal",
  "Gluten-Free",
  "Dairy-Free",
];

const allergenEnum = [
  "Peanuts",
  "Tree Nuts",
  "Dairy",
  "Eggs",
  "Gluten",
  "Soy",
  "Shellfish",
  "Fish",
  "Sesame",
];

const menuCategoryEnum = [
  "Salad & Cold Appetizers",
  "Soup & Hot Appetizers",
  "Pasta & Noodles",
  "Rice & Grains",
  "Vegetable Dishes",
  "Chicken Dishes",
  "Beef Dishes",
  "Pork Dishes",
  "Seafood Dishes",
  "Bread & Pastries",
  "Desserts & Sweets",
  "Hot Beverages",
  "Cold Beverages",
];

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide menu item name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide menu description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide menu price"],
      minLength: [0, "Price cannot be negative"],
    },
    servingSize: {
      type: Number,
      required: [true, "Please provide serving size"],
      minLength: [1, "Serving size must be at least 1"],
    },
    category: {
      type: String,
      enum: menuCategoryEnum,
    },
    dietaryInfo: {
      type: [String],
      enum: dietaryInfoEnum,
      default: [],
    },
    allergens: {
      type: [String],
      enum: allergenEnum,
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    mainImage: {
      type: String,
      required: [true, "Please provide the main menu image"],
      default: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    },
    images: {
      type: [String],
      required: [true, "Please provide at least 1 image"],
      default: [],
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
