import { Types } from "mongoose";
import Attendance from "../models/attendance.model";
import Complaint from "../models/complaint.model";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

type RiskLevel = "low" | "medium" | "high";

type StudentRiskResult = {
  studentId: string;
  name: string;
  email: string;
  rollNumber?: string;
  department?: string;
  semester?: number;
  section?: string;
  attendancePercentage: number;
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  complaintCount: number;
  pendingComplaintCount: number;
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: string[];
};

const clampScore = (score: number): number => {
  if (score < 0) {
    return 0;
  }

  if (score > 100) {
    return 100;
  }

  return score;
};

const getRiskLevel = (score: number): RiskLevel => {
  if (score >= 70) {
    return "high";
  }

  if (score >= 40) {
    return "medium";
  }

  return "low";
};

const calculateStudentRisk = async (
  student: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    rollNumber?: string;
    department?: string;
    semester?: number;
    section?: string;
  }
): Promise<StudentRiskResult> => {
  const attendanceRecords = await Attendance.find({
    isActive: true,
    "records.studentEmail": student.email,
  }).lean();

  const studentAttendance = attendanceRecords.flatMap((attendance) =>
    attendance.records
      .filter((record) => record.studentEmail === student.email)
      .map((record) => ({
        status: record.status,
        courseCode: attendance.courseCode,
        courseTitle: attendance.courseTitle,
        date: attendance.date,
      }))
  );

  const totalClasses = studentAttendance.length;

  const presentCount = studentAttendance.filter(
    (record) => record.status === "present"
  ).length;

  const absentCount = studentAttendance.filter(
    (record) => record.status === "absent"
  ).length;

  const lateCount = studentAttendance.filter(
    (record) => record.status === "late"
  ).length;

  const attendancePercentage =
    totalClasses === 0 ? 0 : Math.round((presentCount / totalClasses) * 100);

  const complaints = await Complaint.find({
    isActive: true,
    createdBy: student._id,
  }).lean();

  const complaintCount = complaints.length;

  const pendingComplaintCount = complaints.filter(
    (complaint) => complaint.status !== "resolved"
  ).length;

  let riskScore = 0;
  const reasons: string[] = [];

  if (totalClasses === 0) {
    riskScore += 25;
    reasons.push("No attendance records available yet");
  }

  if (attendancePercentage < 75 && totalClasses > 0) {
    riskScore += 45;
    reasons.push("Attendance is below 75%");
  } else if (attendancePercentage < 85 && totalClasses > 0) {
    riskScore += 25;
    reasons.push("Attendance is below 85%");
  } else if (attendancePercentage < 90 && totalClasses > 0) {
    riskScore += 10;
    reasons.push("Attendance is below 90%");
  }

  if (absentCount >= 5) {
    riskScore += 25;
    reasons.push("High number of absences");
  } else if (absentCount >= 3) {
    riskScore += 15;
    reasons.push("Repeated absences detected");
  } else if (absentCount >= 1) {
    riskScore += 5;
    reasons.push("Absent records found");
  }

  if (lateCount >= 4) {
    riskScore += 15;
    reasons.push("Frequent late attendance");
  } else if (lateCount >= 2) {
    riskScore += 8;
    reasons.push("Late attendance pattern detected");
  }

  if (pendingComplaintCount >= 2) {
    riskScore += 10;
    reasons.push("Multiple unresolved complaints");
  } else if (pendingComplaintCount === 1) {
    riskScore += 5;
    reasons.push("One unresolved complaint");
  }

  if (reasons.length === 0) {
    reasons.push("Academic activity looks stable");
  }

  const finalScore = clampScore(riskScore);

  return {
    studentId: student._id.toString(),
    name: student.name,
    email: student.email,
    rollNumber: student.rollNumber,
    department: student.department,
    semester: student.semester,
    section: student.section,
    attendancePercentage,
    totalClasses,
    presentCount,
    absentCount,
    lateCount,
    complaintCount,
    pendingComplaintCount,
    riskScore: finalScore,
    riskLevel: getRiskLevel(finalScore),
    reasons,
  };
};

export const getRiskPredictionService = async (authReq: AuthRequest) => {
  if (!authReq.user) {
    throw new Error("Authenticated user not found");
  }

  if (authReq.user.role === "student") {
    const student = await User.findOne({
      _id: authReq.user.id,
      role: "student",
      isActive: true,
    }).lean();

    if (!student) {
      throw new Error("Student profile not found");
    }

    const risk = await calculateStudentRisk({
      _id: student._id,
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      department: student.department,
      semester: student.semester,
      section: student.section,
    });

    return {
      scope: "student",
      count: 1,
      risks: [risk],
    };
  }

  let studentFilter: Record<string, unknown> = {
    role: "student",
    isActive: true,
  };

  if (authReq.user.role === "hod") {
    const hodUser = await User.findById(authReq.user.id).lean();

    studentFilter = {
      ...studentFilter,
      department: hodUser?.department || "Computer Applications",
    };
  }

  const students = await User.find(studentFilter)
    .select("name email rollNumber department semester section role")
    .sort({ department: 1, semester: 1, section: 1, rollNumber: 1 })
    .lean();

  const risks = await Promise.all(
    students.map((student) =>
      calculateStudentRisk({
        _id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        semester: student.semester,
        section: student.section,
      })
    )
  );

  const sortedRisks = risks.sort((a, b) => b.riskScore - a.riskScore);

  return {
    scope: authReq.user.role === "hod" ? "department" : "campus",
    count: sortedRisks.length,
    risks: sortedRisks,
  };
};