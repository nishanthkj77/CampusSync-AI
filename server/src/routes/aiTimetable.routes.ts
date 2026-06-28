import { Router } from "express";
import {
  generateAITimetablePreview,
  saveAITimetablePreview,
} from "../controllers/aiTimetable.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/generate-preview",
  protect,
  authorizeRoles("hod", "admin"),
  generateAITimetablePreview
);

router.post(
  "/save",
  protect,
  authorizeRoles("hod", "admin"),
  saveAITimetablePreview
);

export default router;