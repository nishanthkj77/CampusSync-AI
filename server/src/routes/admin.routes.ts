import { Router } from "express";
import { getAdminUsers } from "../controllers/role.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/users", protect, authorizeRoles("admin"), getAdminUsers);

export default router;