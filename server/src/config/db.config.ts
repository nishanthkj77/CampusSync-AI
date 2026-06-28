 import mongoose from "mongoose";
import { env } from "../utils/env";

export const connectDB = async (): Promise<void> => {
  const connection = await mongoose.connect(env.mongoUri);

  console.log("=================================");
  console.log("✅ MongoDB Connected Successfully");
  console.log(`📦 Database Host: ${connection.connection.host}`);
  console.log("=================================");
};