 import { Schema, model, Document, Types } from "mongoose";

export type AttendanceStatus = "present" | "absent" | "late";

export type AttendanceStudentRecord = {
  rollNumber?: string;
  studentName: string;
  studentEmail: string;
  status: AttendanceStatus;
  remarks?: string;
};

export interface IAttendance extends Document {
  courseCode: string;
  courseTitle: string;
  department: string;
  semester: number;
  section: string;
  facultyName: string;
  facultyEmail: string;
  date: string;
  records: AttendanceStudentRecord[];
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceStudentRecordSchema = new Schema<AttendanceStudentRecord>(
  {
    rollNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    studentEmail: {
      type: String,
      required: [true, "Student email is required"],
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "late"],
      default: "present",
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const attendanceSchema = new Schema<IAttendance>(
  {
    courseCode: {
      type: String,
      required: [true, "Course code is required"],
      trim: true,
    },
    courseTitle: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: 1,
      max: 10,
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      trim: true,
      uppercase: true,
    },
    facultyName: {
      type: String,
      required: [true, "Faculty name is required"],
      trim: true,
    },
    facultyEmail: {
      type: String,
      required: [true, "Faculty email is required"],
      lowercase: true,
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Attendance date is required"],
    },
    records: {
      type: [attendanceStudentRecordSchema],
      default: [],
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

const Attendance = model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;