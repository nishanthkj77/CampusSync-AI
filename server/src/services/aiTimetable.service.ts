import Timetable, {
  DayOfWeek,
  SessionType,
} from "../models/timetable.model";
import { AuthRequest } from "../middleware/auth.middleware";

type TimeSlot = {
  startTime: string;
  endTime: string;
};

type AICourseInput = {
  courseCode: string;
  courseTitle: string;
  facultyName: string;
  facultyEmail: string;
  sessionsPerWeek: number;
  sessionType?: SessionType;
};

type GenerateTimetableInput = {
  department: string;
  semester: number;
  section: string;
  rooms?: string[];
  days?: DayOfWeek[];
  timeSlots?: TimeSlot[];
  courses: AICourseInput[];
};

type PreviewEntry = {
  tempId: string;
  courseCode: string;
  courseTitle: string;
  department: string;
  semester: number;
  section: string;
  facultyName: string;
  facultyEmail: string;
  room: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  sessionType: SessionType;
};

type ScheduleEntry = Omit<PreviewEntry, "tempId">;

const defaultDays: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const defaultRooms = ["B-201", "B-202", "B-203", "Lab-1", "Lab-2"];

const defaultTimeSlots: TimeSlot[] = [
  { startTime: "09:00", endTime: "10:00" },
  { startTime: "10:00", endTime: "11:00" },
  { startTime: "11:15", endTime: "12:15" },
  { startTime: "13:15", endTime: "14:15" },
  { startTime: "14:15", endTime: "15:15" },
  { startTime: "15:15", endTime: "16:15" },
];

const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const isTimeOverlapping = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean => {
  return toMinutes(startA) < toMinutes(endB) && toMinutes(startB) < toMinutes(endA);
};

const hasConflict = (
  candidate: ScheduleEntry,
  existingEntries: ScheduleEntry[]
): boolean => {
  return existingEntries.some((entry) => {
    const sameDay = entry.dayOfWeek === candidate.dayOfWeek;

    if (!sameDay) {
      return false;
    }

    const timeOverlap = isTimeOverlapping(
      candidate.startTime,
      candidate.endTime,
      entry.startTime,
      entry.endTime
    );

    if (!timeOverlap) {
      return false;
    }

    const roomConflict = entry.room === candidate.room;

    const facultyConflict =
      entry.facultyEmail.toLowerCase() === candidate.facultyEmail.toLowerCase();

    const sectionConflict =
      entry.department === candidate.department &&
      entry.semester === candidate.semester &&
      entry.section === candidate.section;

    return roomConflict || facultyConflict || sectionConflict;
  });
};

const normalizeExistingEntry = (entry: ScheduleEntry): ScheduleEntry => ({
  courseCode: entry.courseCode,
  courseTitle: entry.courseTitle,
  department: entry.department,
  semester: entry.semester,
  section: entry.section,
  facultyName: entry.facultyName,
  facultyEmail: entry.facultyEmail,
  room: entry.room,
  dayOfWeek: entry.dayOfWeek,
  startTime: entry.startTime,
  endTime: entry.endTime,
  sessionType: entry.sessionType,
});

const findAvailableSlot = (
  baseEntry: Omit<ScheduleEntry, "room" | "dayOfWeek" | "startTime" | "endTime">,
  rooms: string[],
  days: DayOfWeek[],
  timeSlots: TimeSlot[],
  existingEntries: ScheduleEntry[]
): ScheduleEntry | null => {
  for (const dayOfWeek of days) {
    for (const slot of timeSlots) {
      for (const room of rooms) {
        const candidate: ScheduleEntry = {
          ...baseEntry,
          room,
          dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime,
        };

        if (!hasConflict(candidate, existingEntries)) {
          return candidate;
        }
      }
    }
  }

  return null;
};

export const generateAITimetablePreviewService = async (
  input: GenerateTimetableInput
) => {
  if (!input.department || !input.semester || !input.section) {
    throw new Error("Department, semester, and section are required");
  }

  if (!input.courses || input.courses.length === 0) {
    throw new Error("At least one course is required");
  }

  const rooms = input.rooms && input.rooms.length > 0 ? input.rooms : defaultRooms;
  const days = input.days && input.days.length > 0 ? input.days : defaultDays;
  const timeSlots =
    input.timeSlots && input.timeSlots.length > 0
      ? input.timeSlots
      : defaultTimeSlots;

  const existing = await Timetable.find({ isActive: true }).lean();

  const generated: PreviewEntry[] = [];
  const unscheduled: string[] = [];

  for (const course of input.courses) {
    const sessionsNeeded = Math.max(1, course.sessionsPerWeek || 1);

    for (let sessionIndex = 1; sessionIndex <= sessionsNeeded; sessionIndex++) {
      const baseEntry: Omit<
        ScheduleEntry,
        "room" | "dayOfWeek" | "startTime" | "endTime"
      > = {
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        department: input.department,
        semester: input.semester,
        section: input.section.toUpperCase(),
        facultyName: course.facultyName,
        facultyEmail: course.facultyEmail,
        sessionType: course.sessionType || "lecture",
      };

      const existingEntries: ScheduleEntry[] = [
        ...existing.map((entry) => normalizeExistingEntry(entry as ScheduleEntry)),
        ...generated.map(({ tempId: _tempId, ...entry }) => entry),
      ];

      const slot = findAvailableSlot(
        baseEntry,
        rooms,
        days,
        timeSlots,
        existingEntries
      );

      if (!slot) {
        unscheduled.push(`${course.courseCode} session ${sessionIndex}`);
        continue;
      }

      generated.push({
        tempId: `AI-${Date.now()}-${generated.length + 1}`,
        ...slot,
      });
    }
  }

  return {
    generatedCount: generated.length,
    unscheduledCount: unscheduled.length,
    preview: generated,
    unscheduled,
    message:
      unscheduled.length === 0
        ? "AI timetable preview generated without conflicts"
        : "AI timetable preview generated with some unscheduled sessions",
  };
};

export const saveAITimetablePreviewService = async (
  entries: PreviewEntry[],
  authReq: AuthRequest
) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  if (!entries || entries.length === 0) {
    throw new Error("No preview entries received for saving");
  }

  const existing = await Timetable.find({ isActive: true }).lean();

  const existingEntries = existing.map((entry) =>
    normalizeExistingEntry(entry as ScheduleEntry)
  );

  const entriesToCheck: ScheduleEntry[] = entries.map(
    ({ tempId: _tempId, ...entry }) => entry
  );

  const acceptedEntries: ScheduleEntry[] = [];

  for (const entry of entriesToCheck) {
    const conflictExists = hasConflict(entry, [
      ...existingEntries,
      ...acceptedEntries,
    ]);

    if (conflictExists) {
      throw new Error(
        `Conflict detected while saving ${entry.courseCode} on ${entry.dayOfWeek}`
      );
    }

    acceptedEntries.push(entry);
  }

  const savedEntries = await Timetable.insertMany(
    acceptedEntries.map((entry) => ({
      ...entry,
      createdBy: authReq.user?.id,
      isActive: true,
    }))
  );

  return {
    savedCount: savedEntries.length,
    timetables: savedEntries,
  };
};