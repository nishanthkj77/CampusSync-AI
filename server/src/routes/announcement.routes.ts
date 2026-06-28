import { Router } from "express";
import {
  createAnnouncement,
  getAnnouncements,
} from "../controllers/announcement.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "hod", "faculty"),
  createAnnouncement
);

router.get(
  "/",
  protect,
  authorizeRoles("student", "faculty", "hod", "admin"),
  getAnnouncements
);

export default router;