import { faker } from "@faker-js/faker";
import { connectToDatabase, closeConnection } from "../database/mongodb.js";
import Menu from "../models/menu.model.js";

// Enums from model
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

const generateMenus = async (count) => {
  const menus = [];
  for (let i = 0; i < count; i++) {
    menus.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence({ min: 5, max: 15 }),
      price: faker.number.float({ min: 2.99, max: 29.99, fractionDigits: 2 }),
      servingSize: faker.number.int({ min: 1, max: 10 }),
      category: faker.helpers.arrayElement(menuCategoryEnum),
      dietaryInfo: faker.helpers.arrayElements(dietaryInfoEnum, {
        min: 0,
        max: 3,
      }),
      allergens: faker.helpers.arrayElements(allergenEnum, { min: 0, max: 4 }),
      isAvailable: faker.datatype.boolean({ probability: 0.9 }),
      mainImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        faker.commerce.productName()
      )}&background=random`,
      images: Array.from({ length: 4 }, () =>
        faker.image.urlLoremFlickr({
          category: "food",
          width: 640,
          height: 480,
        })
      ),
    });
  }

  return menus;
};

const seedMenus = async () => {
  await connectToDatabase();
  try {
    const dummyMenus = await generateMenus(10);
    await Menu.insertMany(dummyMenus);
    console.log("Seeded database with dummy Menus:", dummyMenus);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await closeConnection();
  }
};

const deleteAllDummyMenus = async () => {
  await connectToDatabase();
  try {
    await Menu.deleteMany({});
    console.log("Cleared existing dummy menus");
  } catch (error) {
    console.error("Error deleting the dummy Menus:", error);
  } finally {
    await closeConnection();
  }
};


seedMenus();