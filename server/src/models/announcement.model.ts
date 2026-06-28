import { Schema, model, Document, Types } from "mongoose";
import { UserRole } from "./user.model";

export type AnnouncementCategory =
  | "general"
  | "academic"
  | "exam"
  | "event"
  | "urgent";

export type AnnouncementPriority = "low" | "medium" | "high";

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  audienceRoles: UserRole[];
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    message: {
      type: String,
      required: [true, "Announcement message is required"],
      trim: true,
      minlength: [5, "Message must be at least 5 characters"],
    },
    category: {
      type: String,
      enum: ["general", "academic", "exam", "event", "urgent"],
      default: "general",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    audienceRoles: {
      type: [String],
      enum: ["student", "faculty", "hod", "admin"],
      default: ["student", "faculty", "hod", "admin"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = model<IAnnouncement>(
  "Announcement",
  announcementSchema
);

export default Announcement;