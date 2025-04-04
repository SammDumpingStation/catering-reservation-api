import { menuItems } from "./data.js";
import Menu from "./menu.schema.js";
import getKeyPress from "../getKeyPress.js";

export const seedMenus = async () => {
  try {
    const key = await getKeyPress(
      "\n\nAre you sure you want to delete all existing menu items? (y/n): "
    );

    if (key === "y") {
      // Clear existing data
      await Menu.deleteMany({});
      console.log("✅ Cleared existing Menus collection");

      // Insert new data
      await Menu.insertMany(menuItems);
      console.log("✅ Successfully seeded Menus collection with data");
      return true;
    } else {
      console.log("❌ Seeding canceled. No data was deleted.");
      return false;
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    return false;
  }
};
