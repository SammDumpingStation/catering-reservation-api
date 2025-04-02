// import mongoose from "mongoose";
// import {
//   DB_URI_CLOUD,
//   DB_URI_LOCAL,
//   NODE_ENV,
//   USE_CLOUD_DB,
// } from "../config/env.js";

// const connectToDatabase = async () => {
//   if (USE_CLOUD_DB === "true") {
//     try {
//       console.log(`Trying to connect to Cloud Database...`);
//       await mongoose.connect(DB_URI_CLOUD);
//       console.log(`✅ Connected to Cloud Database in ${NODE_ENV} mode`);
//     } catch (error) {
//       console.error("❌ Error connecting to Cloud Database:", error.message);
//     }
//   }
//   if (USE_CLOUD_DB === "false") {
//     try {
//       await mongoose.connect(DB_URI_LOCAL);
//       console.log("✅ Successfully connected to Local Database");
//     } catch (localError) {
//       console.error(
//         "❌ Failed to connect to Local Database:",
//         localError.message
//       );
//       process.exit(1);
//     }
//   }
// };

// // Function to close the database connection
// const closeConnection = async () => {
//   try {
//     // Check if there's an active connection
//     if (mongoose.connection.readyState === 1) {
//       // 1 means "connected"
//       await mongoose.connection.close();
//       console.log("✅ Database connection closed successfully");
//     } else {
//       console.log("ℹ️ No active database connection to close");
//     }
//   } catch (error) {
//     console.error("❌ Error closing database connection:", error.message);
//     throw error; // Optionally rethrow the error for upstream handling
//   }
// };

// export { connectToDatabase, closeConnection };

// UNCOMMENT WHICH PART OF FUNCTION TO CONNECT TO DB

// import mongoose, { Mongoose } from "mongoose";
// import { DB_URI_LOCAL, NODE_ENV } from "@config/env.js";

// const connectToDatabase = async (
//   callback: (client: Mongoose | null) => void
// ) => {
//   try {
//     if (!DB_URI_LOCAL) {
//       throw new Error(
//         "DB_URI_LOCAL is undefined. Please check your .env file."
//       );
//     }

//     const client = await mongoose.connect(DB_URI_LOCAL);

//     if (client) {
//       console.log("=========================================");
//       console.log(`✅ Connected to database in ${NODE_ENV} mode.`);
//       console.log("=========================================");
//       return callback(client);
//     }

//     return callback(null);
//   } catch (error) {
//     console.error("❌ Error connecting to database:", error);
//     process.exit(1);
//   }
// };

// export default connectToDatabase;

import mongoose from "mongoose";
import { DB_URI_LOCAL, NODE_ENV } from "@config/env.js";

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