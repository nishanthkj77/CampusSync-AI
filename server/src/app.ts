 import express, { Application, Request, Response } from "express";
import cors from "cors";
import apiRoutes from "./routes";
import { env } from "./utils/env";

const app: Application = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "CampusSync AI Backend Running 🚀",
    environment: env.nodeEnv,
  });
});

app.use("/api", apiRoutes);

export default app;