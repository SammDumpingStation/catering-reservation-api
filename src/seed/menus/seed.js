import connectToDatabase from "../mongodb.js";
// import Menu from "./menu.schema.js";
import { menuItems } from "./data.js";
import Menu from "./menu.schema.js";

export const seedMenus = async () => {
  try {
    // Connect to MongoDB
    const client = await connectToDatabase();
    if (!client) {
      throw new Error("Failed to connect to database");
    }

    // Clear existing data
    await Menu.deleteMany({});
    console.log("Cleared existing Menus collection");

    // Insert new data
    await Menu.insertMany(menuItems);
    console.log("Successfully seeded Menus collection with data");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

// Run the seeder
seedMenus().catch((err) => {
  console.error("Seeder encountered an error:", err);
  process.exit(1);
});
