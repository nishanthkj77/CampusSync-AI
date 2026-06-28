import Timetable from "../models/timetable.model";

type TimetablePlain = {
  _id: string | { toString: () => string };
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
  sessionType: string;
};

type ConflictType = "room_conflict" | "faculty_conflict" | "section_conflict";

type ConflictSeverity = "high" | "medium";

type TimetableConflict = {
  id: string;
  type: ConflictType;
  severity: ConflictSeverity;
  message: string;
  dayOfWeek: string;
  timeWindow: string;
  entries: TimetablePlain[];
  suggestion: string;
};

const hasTimeOverlap = (
  firstStart: string,
  firstEnd: string,
  secondStart: string,
  secondEnd: string
): boolean => {
  return firstStart < secondEnd && secondStart < firstEnd;
};

const getTimeWindow = (
  firstStart: string,
  firstEnd: string,
  secondStart: string,
  secondEnd: string
): string => {
  const start = firstStart > secondStart ? firstStart : secondStart;
  const end = firstEnd < secondEnd ? firstEnd : secondEnd;

  return `${start} - ${end}`;
};

const getEntryId = (entry: TimetablePlain): string => {
  return entry._id.toString();
};

const createConflict = (
  type: ConflictType,
  first: TimetablePlain,
  second: TimetablePlain
): TimetableConflict => {
  const timeWindow = getTimeWindow(
    first.startTime,
    first.endTime,
    second.startTime,
    second.endTime
  );

  if (type === "room_conflict") {
    return {
      id: `${getEntryId(first)}-${getEntryId(second)}-room`,
      type,
      severity: "high",
      message: `Room ${first.room} is assigned to multiple classes at the same time.`,
      dayOfWeek: first.dayOfWeek,
      timeWindow,
      entries: [first, second],
      suggestion:
        "Assign one class to a different room or change one session timing.",
    };
  }

  if (type === "faculty_conflict") {
    return {
      id: `${getEntryId(first)}-${getEntryId(second)}-faculty`,
      type,
      severity: "high",
      message: `${first.facultyName} has multiple classes at the same time.`,
      dayOfWeek: first.dayOfWeek,
      timeWindow,
      entries: [first, second],
      suggestion:
        "Move one session to another slot or assign another available faculty member.",
    };
  }

  return {
    id: `${getEntryId(first)}-${getEntryId(second)}-section`,
    type,
    severity: "medium",
    message: `${first.department} semester ${first.semester} section ${first.section} has overlapping classes.`,
    dayOfWeek: first.dayOfWeek,
    timeWindow,
    entries: [first, second],
    suggestion:
      "Reschedule one class because the same student group cannot attend both sessions.",
  };
};

export const getTimetableConflictsService = async () => {
  const entries = (await Timetable.find({ isActive: true })
    .sort({ dayOfWeek: 1, startTime: 1 })
    .lean()) as unknown as TimetablePlain[];

  const conflicts: TimetableConflict[] = [];

  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      const first = entries[i];
      const second = entries[j];

      if (first.dayOfWeek !== second.dayOfWeek) {
        continue;
      }

      const overlaps = hasTimeOverlap(
        first.startTime,
        first.endTime,
        second.startTime,
        second.endTime
      );

      if (!overlaps) {
        continue;
      }

      if (first.room.toLowerCase() === second.room.toLowerCase()) {
        conflicts.push(createConflict("room_conflict", first, second));
      }

      if (first.facultyEmail === second.facultyEmail) {
        conflicts.push(createConflict("faculty_conflict", first, second));
      }

      const sameStudentGroup =
        first.department.toLowerCase() === second.department.toLowerCase() &&
        first.semester === second.semester &&
        first.section.toLowerCase() === second.section.toLowerCase();

      if (sameStudentGroup) {
        conflicts.push(createConflict("section_conflict", first, second));
      }
    }
  }

  return {
    totalEntries: entries.length,
    conflictCount: conflicts.length,
    conflicts,
  };
};