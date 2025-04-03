import mongoose from "mongoose";
import { DB_URI_LOCAL, NODE_ENV } from "./env.js";

const connectToDatabase = async () => {
  try {
    if (!DB_URI_LOCAL) throw new Error("DB_URI_LOCAL undefined");
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to database");
      return mongoose.connection;
    }
    const client = await mongoose.connect(DB_URI_LOCAL);
    console.log(`✅ Connected in ${NODE_ENV} mode`);
    return client;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export default connectToDatabase;
