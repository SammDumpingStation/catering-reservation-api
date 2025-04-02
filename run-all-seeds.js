import { seedCustomers } from "./src/seed/customer/seed.js";
import { seedMenus } from "./src/seed/menus/seed.js";
import { seedPackages } from "./src/seed/packages/seed.js";

const runAllSeeds = async () => {
  try {
    console.log("Starting all seed operations...");

    await seedPackages();
    await seedCustomers();
    await seedMenus();

    console.log("All seed operations completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

runAllSeeds();
