import connectToDatabase from "../mongodb.js";
// import Menu from "./menu.schema.js";
import { customers } from "./data.js";
import Customer from "./customer.schema.js";

export const seedCustomers = async () => {
  try {
    // Connect to MongoDB
    const client = await connectToDatabase();
    if (!client) {
      throw new Error("Failed to connect to database");
    }

    // Clear existing data
    await Customer.deleteMany({});
    console.log("Cleared existing Menus collection");

    // Insert new data
    await Customer.insertMany(customers);
    console.log("Successfully seeded Menus collection with data");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

// Run the seeder
seedCustomers().catch((err) => {
  console.error("Seeder encountered an error:", err);
  process.exit(1);
});
