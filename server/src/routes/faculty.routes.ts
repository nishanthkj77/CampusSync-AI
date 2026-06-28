import { Router } from "express";
import { getFacultyClasses } from "../controllers/role.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/classes", protect, authorizeRoles("faculty"), getFacultyClasses);

export default router;