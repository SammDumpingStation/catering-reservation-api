import mongoose from "mongoose";
import { DB_URI_CLOUD, DB_URI_LOCAL, NODE_ENV } from "../config/env.js";

const connectToDatabase = async () => {
  try {
    console.log(`Trying to connect to Cloud Database...`);
    await mongoose.connect(DB_URI_CLOUD);
    console.log(`✅ Connected to Cloud Database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("❌ Error connecting to Cloud Database:", error.message);

    console.log("🔄 Attempting to connect to Local Database...");
    try {
      await mongoose.connect(DB_URI_LOCAL);
      console.log("✅ Successfully connected to Local Database");
    } catch (localError) {
      console.error(
        "❌ Failed to connect to Local Database:",
        localError.message
      );
      process.exit(1);
    }
  }
};

export default connectToDatabase;
