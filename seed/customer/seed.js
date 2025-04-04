import { customers } from "./data.js";
import Customer from "./customer.schema.js";
import getKeyPress from "../getKeyPress.js";

export const seedCustomers = async () => {
  try {
    const key = await getKeyPress(
      "\n\nAre you sure you want to delete all existing customers? (y/n): "
    );

    if (key === "y") {
      // Clear existing data
      await Customer.deleteMany({});
      console.log("✅ Cleared existing Customers collection");

      // Insert new data
      await Customer.insertMany(customers);
      console.log("✅ Successfully seeded Customers collection with data");
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
