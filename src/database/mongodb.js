import mongoose from "mongoose";
import {
  DB_URI_CLOUD,
  DB_URI_LOCAL,
  NODE_ENV,
  USE_CLOUD_DB,
} from "../config/env.js";

const connectToDatabase = async () => {
  if (USE_CLOUD_DB === "true") {
    try {
      console.log(`Trying to connect to Cloud Database...`);
      await mongoose.connect(DB_URI_CLOUD);
      console.log(`✅ Connected to Cloud Database in ${NODE_ENV} mode`);
    } catch (error) {
      console.error("❌ Error connecting to Cloud Database:", error.message);
    }
  }
  if (USE_CLOUD_DB === "false") {
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

// Function to close the database connection
const closeConnection = async () => {
  try {
    // Check if there's an active connection
    if (mongoose.connection.readyState === 1) {
      // 1 means "connected"
      await mongoose.connection.close();
      console.log("✅ Database connection closed successfully");
    } else {
      console.log("ℹ️ No active database connection to close");
    }
  } catch (error) {
    console.error("❌ Error closing database connection:", error.message);
    throw error; // Optionally rethrow the error for upstream handling
  }
};

export { connectToDatabase, closeConnection };
