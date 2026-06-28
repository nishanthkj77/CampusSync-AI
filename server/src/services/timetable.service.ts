 import Timetable from "../models/timetable.model";
import { AuthRequest } from "../middleware/auth.middleware";

type TimetableInput = {
  courseCode: string;
  courseTitle: string;
  department: string;
  semester: number;
  section: string;
  facultyName: string;
  facultyEmail: string;
  room: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  sessionType?: string;
};

export const createTimetableService = async (
  input: TimetableInput,
  authReq: AuthRequest
) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  const timetable = await Timetable.create({
    courseCode: input.courseCode,
    courseTitle: input.courseTitle,
    department: input.department,
    semester: input.semester,
    section: input.section,
    facultyName: input.facultyName,
    facultyEmail: input.facultyEmail,
    room: input.room,
    dayOfWeek: input.dayOfWeek,
    startTime: input.startTime,
    endTime: input.endTime,
    sessionType: input.sessionType || "lecture",
    createdBy: authReq.user.id,
  });

  return timetable;
};

export const getAllTimetablesService = async () => {
  return Timetable.find({ isActive: true })
    .sort({ dayOfWeek: 1, startTime: 1 })
    .populate("createdBy", "name email role");
};

export const getMyTimetableService = async (authReq: AuthRequest) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  if (authReq.user.role === "faculty") {
    return Timetable.find({
      isActive: true,
      facultyEmail: authReq.user.email,
    }).sort({ dayOfWeek: 1, startTime: 1 });
  }

  return Timetable.find({ isActive: true }).sort({
    dayOfWeek: 1,
    startTime: 1,
  });
};

export const updateTimetableService = async (
  timetableId: string,
  input: Partial<TimetableInput>
) => {
  const timetable = await Timetable.findByIdAndUpdate(timetableId, input, {
    new: true,
    runValidators: true,
  });

  if (!timetable) {
    throw new Error("Timetable entry not found");
  }

  return timetable;
};

export const deleteTimetableService = async (timetableId: string) => {
  const timetable = await Timetable.findByIdAndUpdate(
    timetableId,
    { isActive: false },
    { new: true }
  );

  if (!timetable) {
    throw new Error("Timetable entry not found");
  }

  return timetable;
};