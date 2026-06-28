import { Router } from "express";
import { getRiskPredictions } from "../controllers/risk.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  protect,
  authorizeRoles("student", "hod", "admin"),
  getRiskPredictions
);

export default router;