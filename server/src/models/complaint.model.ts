import { Schema, model, Document, Types } from "mongoose";

export type ComplaintCategory =
  | "academic"
  | "hostel"
  | "maintenance"
  | "transport"
  | "canteen"
  | "other";

export type ComplaintPriority = "low" | "medium" | "high";

export type ComplaintStatus = "pending" | "in_progress" | "resolved";

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdBy: Types.ObjectId;
  responseNote?: string;
  statusUpdatedBy?: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    title: {
      type: String,
      required: [true, "Complaint title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Complaint description is required"],
      trim: true,
      minlength: [8, "Description must be at least 8 characters"],
    },
    category: {
      type: String,
      enum: [
        "academic",
        "hostel",
        "maintenance",
        "transport",
        "canteen",
        "other",
      ],
      default: "other",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responseNote: {
      type: String,
      trim: true,
      default: "",
    },
    statusUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Complaint = model<IComplaint>("Complaint", complaintSchema);

export default Complaint;