// import Menu from "./menu.schema.js";
import { customers } from "./data.js";
import Customer from "./customer.schema.js";

export const seedCustomers = async () => {
  try {
    // Clear existing data
    const deleteCustomers = await Customer.deleteMany({});
    if (deleteCustomers) console.log("Cleared existing Customers collection");

    // Insert new data
    const insertCustomers = await Customer.insertMany(customers);
    if (insertCustomers)
      console.log("Successfully seeded Customers collection with data");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};
