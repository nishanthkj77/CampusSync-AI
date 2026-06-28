 import app from "./app";
import { connectDB } from "./config/db.config";
import { env } from "./utils/env";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
  } catch (error) {
    console.log("=================================");
    console.log("⚠️ MongoDB not connected");
    console.log("⚠️ Backend will still run for development");
    console.log("=================================");
  }

  app.listen(env.port, () => {
    console.log("=================================");
    console.log("🚀 CampusSync AI Backend Started");
    console.log(`🌐 Server: http://localhost:${env.port}`);
    console.log("=================================");
  });
};

startServer();