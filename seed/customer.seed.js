import { faker } from "@faker-js/faker";
import { connectToDatabase, closeConnection } from "../database/mongodb.js";
import Customer from "../models/customer.model.js";

const generateCustomers = (count) => {
  const customers = [];
  for (let i = 0; i < count; i++) {
    customers.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
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
    const dummyCustomers = generateCustomers(49);
    await Customer.insertMany(dummyCustomers);
    console.log("Seeded database with dummy s:", dummyCustomers);
    await closeConnection();
  } catch (error) {
    console.error("Error seeding database:", error);
    await closeConnection();
  }
};

seedCustomers();
