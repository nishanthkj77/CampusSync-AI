import { Router } from "express";
import { getStudentRoster } from "../controllers/studentRoster.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/roster",
  protect,
  authorizeRoles("faculty", "hod", "admin"),
  getStudentRoster
);

export default router;