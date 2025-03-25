import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import connectToDatabase from "@database/mongodb.js";
import Customer from "@schemas/customer.schema.js";

const generateCustomers = async (count: number) => {
  const customers = [];

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password", salt);

  for (let i = 0; i < count; i++) {
    customers.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashedPassword,
      contactNumber: faker.phone.number(),
      role: "customer",
      profileImage: faker.image.avatar(),
    });
  }
  return customers;
};

const seedCustomers = async () => {
  await connectToDatabase(async (client) => {
    if (!client) return;

    try {
      const dummyCustomers = await generateCustomers(50);
      // Format the data as a JavaScript module

      const dbUsers = await Customer.insertMany(dummyCustomers);

      const fileContent = `module.exports = ${JSON.stringify(
        dbUsers,
        null,
        2
      )};`;
      await fs.writeFile("./fakeUsers.js", fileContent, "utf8");

      console.log("Seeded database with dummy customers:", dummyCustomers);
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  });
};

// const deleteAllDummyCustomers = async () => {
//   await connectToDatabase();
//   try {
//     await Customer.deleteMany({});
//     console.log("Cleared existing dummy users");
//   } catch (error) {
//     console.error("Error deleting the dummy customers:", error);
//   }
// };

// const saveCustomersToFile = async (count, filePath) => {
//   try {
//     const customers = await generateCustomers(count);
//     // Format the data as a JavaScript module
//     const fileContent = `module.exports = ${JSON.stringify(
//       customers,
//       null,
//       2
//     )};`;
//     await fs.writeFile(filePath, fileContent, "utf8");
//     console.log(`Successfully saved ${count} customers to ${filePath}`);
//   } catch (error) {
//     console.error("Error saving customers:", error);
//   }
// };

// Generate 5 customers and save to fakeUsers.js
// saveCustomersToFile(5, "./fakeUsers.js");

//Seeding Customers
seedCustomers(); // Uncomment this if you want to seed dummy customers in the database

//Deleting the existing dummy users
//deleteAllDummyCustomers(); // Uncomment this if you want to delete all the dummy customers
