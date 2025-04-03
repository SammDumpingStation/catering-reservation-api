// import Menu from "./menu.schema.js";
import { cateringPackages } from "./data.js";
import Package from "./package.schema.js";

export const seedPackages = async () => {
  try {
    // Clear existing data
    const deletePkg = await Package.deleteMany({});
    if (deletePkg) console.log("Cleared existing Packages collection");

    // Insert new data
    const insertPkg = await Package.insertMany(cateringPackages);
    if (insertPkg)
      console.log("Successfully seeded Packages collection with data");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};
