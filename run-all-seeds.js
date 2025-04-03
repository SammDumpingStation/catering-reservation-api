import { connectToDatabase, closeDatabaseConnection } from "./seed/mongodb.js";
import { seedCustomers } from "./seed/customer/seed.js";
import { seedPackages } from "./seed/packages/seed.js";
import { seedMenus } from "./seed/menus/seed.js";

const runAllSeeds = async () => {
  try {
    const client = await connectToDatabase();
    if (!client) {
      throw new Error("\n\n❌ Failed to connect to database");
    }
    console.log("Starting all seed operations...");

    const successCustomers = await seedCustomers();
    const successMenus = await seedMenus();
    const successPkg = await seedPackages();

    if (successCustomers && successPkg && successMenus) {
      console.log("\n\n✅ All seed operations completed successfully!");
    }
  } catch (error) {
    console.error("\n\n❌ Error during seeding:", error);
    process.exit(1);
  } finally {
    await closeDatabaseConnection(); // Close the database connection
    process.exit(0); // Exit the process cleanly
  }
};

await runAllSeeds();
