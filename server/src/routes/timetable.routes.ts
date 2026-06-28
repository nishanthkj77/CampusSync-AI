import { Router } from "express";
import {
  createTimetable,
  deleteTimetable,
  getAllTimetables,
  getMyTimetable,
  updateTimetable,
} from "../controllers/timetable.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, authorizeRoles("admin", "hod"), createTimetable);

router.get("/", protect, authorizeRoles("admin", "hod"), getAllTimetables);

router.get(
  "/my",
  protect,
  authorizeRoles("student", "faculty", "hod", "admin"),
  getMyTimetable
);

router.put("/:id", protect, authorizeRoles("admin", "hod"), updateTimetable);

router.delete("/:id", protect, authorizeRoles("admin", "hod"), deleteTimetable);

export default router;