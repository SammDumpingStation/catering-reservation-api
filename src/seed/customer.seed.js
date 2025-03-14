import { faker } from "@faker-js/faker";
import { connectToDatabase, closeConnection } from "../database/mongodb.js";
import Customer from "../models/customer.model.js";
import bcrypt from "bcryptjs";

const generateCustomers = async (count) => {
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
  await connectToDatabase();
  try {
    const dummyCustomers = await generateCustomers(9);
    await Customer.insertMany(dummyCustomers);
    console.log("Seeded database with dummy customers:", dummyCustomers);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await closeConnection();
  }
};

const deleteAllDummyCustomers = async () => {
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
