import Attendance from "../models/attendance.model";
import Complaint from "../models/complaint.model";
import Timetable from "../models/timetable.model";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

type ReportScope = "campus" | "department";

const calculateAttendanceSummary = (
  attendanceEntries: {
    records: {
      status: "present" | "absent" | "late";
    }[];
  }[]
) => {
  const allRecords = attendanceEntries.flatMap((entry) => entry.records);

  const totalMarked = allRecords.length;

  const presentCount = allRecords.filter(
    (record) => record.status === "present"
  ).length;

  const absentCount = allRecords.filter(
    (record) => record.status === "absent"
  ).length;

  const lateCount = allRecords.filter((record) => record.status === "late").length;

  const attendancePercentage =
    totalMarked === 0 ? 0 : Math.round((presentCount / totalMarked) * 100);

  return {
    totalClasses: attendanceEntries.length,
    totalMarked,
    presentCount,
    absentCount,
    lateCount,
    attendancePercentage,
  };
};

const countByStatus = <T extends string>(
  values: T[],
  allowedValues: T[]
): Record<T, number> => {
  return allowedValues.reduce((result, value) => {
    result[value] = values.filter((item) => item === value).length;
    return result;
  }, {} as Record<T, number>);
};

export const getOverviewReportService = async (authReq: AuthRequest) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  let scope: ReportScope = "campus";
  let departmentFilter: Record<string, unknown> = {};
  let departmentName = "All Departments";

  if (authReq.user.role === "hod") {
    const hodUser = await User.findById(authReq.user.id).lean();

    departmentName = hodUser?.department || "Computer Applications";
    departmentFilter = {
      department: departmentName,
    };
    scope = "department";
  }

  const students = await User.find({
    role: "student",
    isActive: true,
    ...departmentFilter,
  })
    .select("name email rollNumber department semester section")
    .lean();

  const faculty = await User.find({
    role: "faculty",
    isActive: true,
    ...departmentFilter,
  })
    .select("name email department")
    .lean();

  const timetableEntries = await Timetable.find({
    isActive: true,
    ...departmentFilter,
  }).lean();

  const attendanceEntries = await Attendance.find({
    isActive: true,
    ...departmentFilter,
  }).lean();

  const studentIds = students.map((student) => student._id);

  const complaintFilter =
    scope === "department"
      ? {
          isActive: true,
          createdBy: {
            $in: studentIds,
          },
        }
      : {
          isActive: true,
        };

  const complaints = await Complaint.find(complaintFilter).lean();

  const attendanceSummary = calculateAttendanceSummary(attendanceEntries);

  const complaintStatuses = complaints.map((complaint) => complaint.status);

  const complaintPriorities = complaints.map((complaint) => complaint.priority);

  const timetableSessionTypes = timetableEntries.map(
    (entry) => entry.sessionType
  );

  const uniqueRooms = Array.from(
    new Set(timetableEntries.map((entry) => entry.room))
  );

  const uniqueTimetableFaculty = Array.from(
    new Set(timetableEntries.map((entry) => entry.facultyEmail))
  );

  const complaintSummary = {
    totalComplaints: complaints.length,
    byStatus: countByStatus(complaintStatuses, [
      "pending",
      "in_progress",
      "resolved",
    ]),
    byPriority: countByStatus(complaintPriorities, ["low", "medium", "high"]),
  };

  const timetableSummary = {
    totalEntries: timetableEntries.length,
    roomCount: uniqueRooms.length,
    facultyCount: uniqueTimetableFaculty.length,
    bySessionType: countByStatus(timetableSessionTypes, [
      "lecture",
      "lab",
      "seminar",
      "exam",
    ]),
  };

  const departmentBreakdown = await Promise.all(
    Array.from(new Set(students.map((student) => student.department))).map(
      async (department) => {
        const departmentStudents = students.filter(
          (student) => student.department === department
        );

        const departmentAttendance = attendanceEntries.filter(
          (entry) => entry.department === department
        );

        const departmentTimetable = timetableEntries.filter(
          (entry) => entry.department === department
        );

        const departmentStudentIds = departmentStudents.map(
          (student) => student._id
        );

        const departmentComplaints = complaints.filter((complaint) =>
          departmentStudentIds.some(
            (id) => String(id) === String(complaint.createdBy)
          )
        );

        return {
          department,
          students: departmentStudents.length,
          timetableEntries: departmentTimetable.length,
          complaints: departmentComplaints.length,
          attendancePercentage:
            calculateAttendanceSummary(departmentAttendance)
              .attendancePercentage,
        };
      }
    )
  );

  const sectionBreakdown = Array.from(
    new Set(
      students.map(
        (student) =>
          `${student.department || "Unknown"}|${student.semester || 0}|${
            student.section || "A"
          }`
      )
    )
  ).map((key) => {
    const [department, semester, section] = key.split("|");

    const sectionStudents = students.filter(
      (student) =>
        student.department === department &&
        String(student.semester) === semester &&
        student.section === section
    );

    const sectionAttendance = attendanceEntries.filter(
      (entry) =>
        entry.department === department &&
        String(entry.semester) === semester &&
        entry.section === section
    );

    const sectionTimetable = timetableEntries.filter(
      (entry) =>
        entry.department === department &&
        String(entry.semester) === semester &&
        entry.section === section
    );

    return {
      department,
      semester: Number(semester),
      section,
      students: sectionStudents.length,
      timetableEntries: sectionTimetable.length,
      attendancePercentage:
        calculateAttendanceSummary(sectionAttendance).attendancePercentage,
    };
  });

  const alerts: string[] = [];

  if (attendanceSummary.attendancePercentage < 75) {
    alerts.push("Overall attendance is below 75%");
  }

  if (complaintSummary.byStatus.pending > 0) {
    alerts.push(`${complaintSummary.byStatus.pending} complaints are pending`);
  }

  if (timetableSummary.totalEntries === 0) {
    alerts.push("No active timetable entries found");
  }

  if (alerts.length === 0) {
    alerts.push("Campus operations look stable");
  }

  return {
    scope,
    department: departmentName,
    generatedAt: new Date().toISOString(),
    summary: {
      students: students.length,
      faculty: faculty.length,
      timetableEntries: timetableEntries.length,
      attendanceRecords: attendanceEntries.length,
      complaints: complaints.length,
    },
    attendanceSummary,
    complaintSummary,
    timetableSummary,
    departmentBreakdown,
    sectionBreakdown,
    alerts,
  };
};