import { Router } from "express";
import { getHodOverview } from "../controllers/role.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/overview", protect, authorizeRoles("hod", "admin"), getHodOverview);

export default router;