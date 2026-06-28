import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "5000",
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campussync_ai",
  jwtSecret: process.env.JWT_SECRET || "campussync_ai_default_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};