 import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import studentRoutes from "./student.routes";
import facultyRoutes from "./faculty.routes";
import hodRoutes from "./hod.routes";
import adminRoutes from "./admin.routes";
import timetableRoutes from "./timetable.routes";
import announcementRoutes from "./announcement.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/student", studentRoutes);
router.use("/faculty", facultyRoutes);
router.use("/hod", hodRoutes);
router.use("/admin", adminRoutes);
router.use("/timetable", timetableRoutes);
router.use("/announcements", announcementRoutes);

export default router;