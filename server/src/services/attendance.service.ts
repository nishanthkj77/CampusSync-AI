 import Attendance, {
  AttendanceStudentRecord,
} from "../models/attendance.model";
import { AuthRequest } from "../middleware/auth.middleware";

type AttendanceInput = {
  timetableId?: string;
  courseCode: string;
  courseTitle: string;
  department: string;
  semester: number;
  section: string;
  facultyName?: string;
  facultyEmail?: string;
  date: string;
  records: AttendanceStudentRecord[];
};

export const createAttendanceService = async (
  input: AttendanceInput,
  authReq: AuthRequest
) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  const attendance = await Attendance.create({
    courseCode: input.courseCode,
    courseTitle: input.courseTitle,
    department: input.department,
    semester: input.semester,
    section: input.section,
    facultyName: input.facultyName || authReq.user.name,
    facultyEmail: input.facultyEmail || authReq.user.email,
    date: input.date,
    records: input.records,
    createdBy: authReq.user.id,
  });

  return attendance;
};

export const getAttendanceService = async (authReq: AuthRequest) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  if (authReq.user.role === "student") {
    const attendanceRecords = await Attendance.find({
      isActive: true,
      "records.studentEmail": authReq.user.email,
    })
      .sort({ date: -1 })
      .populate("createdBy", "name email role")
      .lean();

    return attendanceRecords.map((attendance) => ({
      ...attendance,
      records: attendance.records.filter(
        (record) => record.studentEmail === authReq.user?.email
      ),
    }));
  }

  if (authReq.user.role === "faculty") {
    return Attendance.find({
      isActive: true,
      facultyEmail: authReq.user.email,
    })
      .sort({ date: -1 })
      .populate("createdBy", "name email role");
  }

  if (authReq.user.role === "hod") {
    return Attendance.find({
      isActive: true,
      department: "Computer Applications",
    })
      .sort({ date: -1 })
      .populate("createdBy", "name email role");
  }

  return Attendance.find({ isActive: true })
    .sort({ date: -1 })
    .populate("createdBy", "name email role");
};

export const updateAttendanceService = async (
  attendanceId: string,
  input: Partial<AttendanceInput>
) => {
  const attendance = await Attendance.findByIdAndUpdate(attendanceId, input, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "name email role");

  if (!attendance) {
    throw new Error("Attendance record not found");
  }

  return attendance;
};