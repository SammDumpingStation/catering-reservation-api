import readline from "readline";
import { menuItems } from "./data.js";
import Menu from "./menu.schema.js";

// Function to create readline interface
const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

export const seedMenus = async () => {
  const rl = createReadlineInterface();
  return new Promise((resolve, reject) => {
    rl.question(
      "\n\n\nAre you sure you want to delete all existing menu items? (y/n): ",
      async (answer) => {
        rl.close(); // Close readline after taking input

        if (answer.toLowerCase() === "y") {
          try {
            // Clear existing data
            const deleteMenus = await Menu.deleteMany({});
            if (deleteMenus)
              console.log("\n✅ Cleared existing Menus collection");

            // Insert new data
            const insertMenus = await Menu.insertMany(menuItems);
            if (insertMenus)
              console.log(
                "\n✅ Successfully seeded Menus collection with data"
              );
            resolve(true);
          } catch (error) {
            console.error("\n❌ Seeding failed:", error);
            reject(error);
          }
        } else if (answer.toLowerCase() === "n") {
          console.log("\n❌ Seeding canceled. No data was deleted.");
          resolve(false);
        } else {
          console.log("\n❌ Invalid input. Seeding process aborted.");
          reject(new Error("Invalid input"));
        }
      }
    );
  });
};
