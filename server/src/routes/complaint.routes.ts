import { Router } from "express";
import {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
} from "../controllers/complaint.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, authorizeRoles("student"), createComplaint);

router.get("/", protect, authorizeRoles("student", "hod", "admin"), getComplaints);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("hod", "admin"),
  updateComplaintStatus
);

export default router;