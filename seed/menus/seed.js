// import Menu from "./menu.schema.js";
import { menuItems } from "./data.js";
import Menu from "./menu.schema.js";

export const seedMenus = async () => {
  try {
    // Clear existing data
    const deleteMenus = await Menu.deleteMany({});
    if (deleteMenus) console.log("Cleared existing Menus collection");

    // Insert new data
    const insertMenus = await Menu.insertMany(menuItems);
    if (insertMenus)
      console.log("Successfully seeded Menus collection with data");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};
