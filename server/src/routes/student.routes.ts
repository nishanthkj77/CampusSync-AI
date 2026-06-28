import { Router } from "express";
import { getStudentProfile } from "../controllers/role.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", protect, authorizeRoles("student"), getStudentProfile);

export default router;