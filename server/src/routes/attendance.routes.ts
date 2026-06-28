import { Router } from "express";
import {
  createAttendance,
  getAttendance,
  updateAttendance,
} from "../controllers/attendance.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, authorizeRoles("faculty"), createAttendance);

router.get(
  "/",
  protect,
  authorizeRoles("student", "faculty", "hod", "admin"),
  getAttendance
);

router.put(
  "/:id",
  protect,
  authorizeRoles("faculty", "hod", "admin"),
  updateAttendance
);

export default router;