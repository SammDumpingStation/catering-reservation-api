import readline from "readline";
import { cateringPackages } from "./data.js";
import Package from "./package.schema.js";

// Function to create readline interface
const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

export const seedPackages = async () => {
  const rl = createReadlineInterface();
  return new Promise((resolve, reject) => {
    rl.question(
      "\n\n\nAre you sure you want to delete all existing packages? (y/n): ",
      async (answer) => {
        rl.close(); // Close readline after taking input

        if (answer.toLowerCase() === "y") {
          try {
            // Clear existing data
            const deletePkg = await Package.deleteMany({});
            if (deletePkg)
              console.log("\n✅ Cleared existing Packages collection");

            // Insert new data
            const insertPkg = await Package.insertMany(cateringPackages);
            if (insertPkg)
              console.log(
                "\n✅ Successfully seeded Packages collection with data"
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
