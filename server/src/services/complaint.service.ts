import Complaint, {
  ComplaintCategory,
  ComplaintPriority,
  ComplaintStatus,
} from "../models/complaint.model";
import { AuthRequest } from "../middleware/auth.middleware";

type CreateComplaintInput = {
  title: string;
  description: string;
  category?: ComplaintCategory;
  priority?: ComplaintPriority;
};

type UpdateComplaintStatusInput = {
  status: ComplaintStatus;
  responseNote?: string;
};

export const createComplaintService = async (
  input: CreateComplaintInput,
  authReq: AuthRequest
) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  const complaint = await Complaint.create({
    title: input.title,
    description: input.description,
    category: input.category || "other",
    priority: input.priority || "medium",
    createdBy: authReq.user.id,
  });

  return complaint;
};

export const getComplaintsService = async (authReq: AuthRequest) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  const filter =
    authReq.user.role === "student"
      ? {
          isActive: true,
          createdBy: authReq.user.id,
        }
      : {
          isActive: true,
        };

  return Complaint.find(filter)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email role")
    .populate("statusUpdatedBy", "name email role");
};

export const updateComplaintStatusService = async (
  complaintId: string,
  input: UpdateComplaintStatusInput,
  authReq: AuthRequest
) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  const complaint = await Complaint.findByIdAndUpdate(
    complaintId,
    {
      status: input.status,
      responseNote: input.responseNote || "",
      statusUpdatedBy: authReq.user.id,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("createdBy", "name email role")
    .populate("statusUpdatedBy", "name email role");

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  return complaint;
};