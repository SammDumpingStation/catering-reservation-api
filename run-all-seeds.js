import connectToDatabase from "./src/seed/mongodb.js";
import { seedCustomers } from "./src/seed/customer/seed.js";
import { seedMenus } from "./src/seed/menus/seed.js";
import { seedPackages } from "./src/seed/packages/seed.js";

const runAllSeeds = async () => {
  try {
    const client = await connectToDatabase();
    if (!client) {
      throw new Error("Failed to connect to database");
    }
    console.log("Starting all seed operations...");

    const successPkg = await seedPackages();
    const successCustomers = await seedCustomers();
    const successMenus = await seedMenus();

    if (successCustomers && successMenus && successPkg) {
      console.log("All seed operations completed successfully!");
    }
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

await runAllSeeds();
