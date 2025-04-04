import { cateringPackages } from "./data.js";
import Package from "./package.schema.js";
import getKeyPress from "../getKeyPress.js";

export const seedPackages = async () => {
  try {
    const key = await getKeyPress(
      "\n\nAre you sure you want to delete all existing packages? (y/n): "
    );

    if (key === "y") {
      // Clear existing data
      await Package.deleteMany({});
      console.log("✅ Cleared existing Packages collection");

      // Insert new data
      await Package.insertMany(cateringPackages);
      console.log("✅ Successfully seeded Packages collection with data");
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
