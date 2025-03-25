import { faker } from "@faker-js/faker";
import { connectToDatabase, closeConnection } from "../database/mongodb.js";
import Customer from "../schemas/customer.schema.js";
import bcrypt from "bcryptjs";

export const generateCustomers = async (count) => {
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
      const dummyCustomers = await generateCustomers(50); // 50 dummy data
      await Customer.insertMany(dummyCustomers); // Efficient batch insertion
      console.log("✅ Seeded database with 50 dummy customers.");
    } catch (error) {
      console.error("❌ Error seeding database:", error);
    }
  });
};

export const deleteAllDummyCustomers = async () => {
  await connectToDatabase();
  try {
    await Customer.deleteMany({});
    console.log("Cleared existing dummy users");
  } catch (error) {
    console.error("Error deleting the dummy customers:", error);
  } finally {
    await closeConnection();
  }
};

//Seeding Customers
seedCustomers(); // Uncomment this if you want to seed dummy customers in the database

//Deleting the existing dummy users
//deleteAllDummyCustomers(); // Uncomment this if you want to delete all the dummy customers
