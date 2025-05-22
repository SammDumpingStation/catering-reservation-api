import mongoose, { Mongoose } from "mongoose";
import { DB_URI_LOCAL, NODE_ENV } from "@config/env.js";

const connectToDatabase = async (
  callback: (client: Mongoose | null) => void
) => {
  try {
    if (!DB_URI_LOCAL) {
      throw new Error(
        "DB_URI_LOCAL is undefined. Please check your .env file."
      );
    }

    const client = await mongoose.connect(DB_URI_LOCAL);

    if (client) {
      console.log("=========================================");
      console.log(`✅ Connected to database in ${NODE_ENV} mode.`);
      console.log("=========================================");
      return callback(client);
    }

    return callback(null);
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
