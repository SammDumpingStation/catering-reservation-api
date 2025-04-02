import connectToDatabase from "../mongodb.js";
// import Menu from "./menu.schema.js";
import { cateringPackages } from "./data.js";
import Package from "./package.schema.js";

export const seedPackages = async () => {
  try {
    // Connect to MongoDB
    const client = await connectToDatabase();
    if (!client) {
      throw new Error("Failed to connect to database");
    }

    // Clear existing data
    await Package.deleteMany({});
    console.log("Cleared existing Packages collection");

    // Insert new data
    await Package.insertMany(cateringPackages);
    console.log("Successfully seeded Packages collection with data");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

// Run the seeder
seedPackages().catch((err) => {
  console.error("Seeder encountered an error:", err);
  process.exit(1);
});
