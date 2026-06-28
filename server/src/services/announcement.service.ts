import Announcement from "../models/announcement.model";
import { AuthRequest } from "../middleware/auth.middleware";
import { UserRole } from "../models/user.model";

type AnnouncementInput = {
  title: string;
  message: string;
  category?: "general" | "academic" | "exam" | "event" | "urgent";
  priority?: "low" | "medium" | "high";
  audienceRoles?: UserRole[];
};

export const createAnnouncementService = async (
  input: AnnouncementInput,
  authReq: AuthRequest
) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  const announcement = await Announcement.create({
    title: input.title,
    message: input.message,
    category: input.category || "general",
    priority: input.priority || "medium",
    audienceRoles: input.audienceRoles || [
      "student",
      "faculty",
      "hod",
      "admin",
    ],
    createdBy: authReq.user.id,
  });

  return announcement;
};

export const getAnnouncementsService = async (authReq: AuthRequest) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  return Announcement.find({
    isActive: true,
    audienceRoles: authReq.user.role,
  })
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email role");
};