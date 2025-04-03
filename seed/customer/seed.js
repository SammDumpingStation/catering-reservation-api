import readline from "readline";
import { customers } from "./data.js";
import Customer from "./customer.schema.js";

// Function to create readline interface
const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

export const seedCustomers = async () => {
  const rl = createReadlineInterface();
  return new Promise((resolve, reject) => {
    rl.question(
      "\n\n\nAre you sure you want to delete all existing customers? (y/n): ",
      async (answer) => {
        rl.close(); // Close readline after taking input

        if (answer.toLowerCase() === "y") {
          try {
            // Clear existing data
            const deleteCustomers = await Customer.deleteMany({});
            if (deleteCustomers)
              console.log("\n✅ Cleared existing Customers collection");

            // Insert new data
            const insertCustomers = await Customer.insertMany(customers);
            if (insertCustomers)
              console.log(
                "\n✅ Successfully seeded Customers collection with data"
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
