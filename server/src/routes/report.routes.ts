import { Router } from "express";
import { getOverviewReport } from "../controllers/report.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/overview",
  protect,
  authorizeRoles("hod", "admin"),
  getOverviewReport
);

export default router;