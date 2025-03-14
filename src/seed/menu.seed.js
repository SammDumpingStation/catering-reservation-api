import { faker } from "@faker-js/faker";
import { connectToDatabase, closeConnection } from "../database/mongodb.js";
import Menu from "../models/menu.model.js";
import { dummyMenus } from "./dummy/menu.dummy.js";

const seedMenus = async () => {
  await connectToDatabase();
  try {
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
// deleteAllDummyMenus();
