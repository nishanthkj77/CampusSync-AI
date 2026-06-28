import { Request, Response } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const getStudentProfile = (req: Request, res: Response): void => {
  const authReq = req as AuthRequest;

  res.status(200).json({
    success: true,
    message: "Student profile fetched successfully",
    data: {
      user: authReq.user,
      modules: ["Timetable", "Attendance", "Complaints", "Announcements"],
    },
  });
};

export const getFacultyClasses = (req: Request, res: Response): void => {
  const authReq = req as AuthRequest;

  res.status(200).json({
    success: true,
    message: "Faculty classes fetched successfully",
    data: {
      user: authReq.user,
      classes: [
        {
          course: "Database Management System",
          className: "MCA II",
          time: "09:00 AM",
          room: "B-204",
        },
        {
          course: "Artificial Intelligence Lab",
          className: "MCA II",
          time: "11:00 AM",
          room: "Lab 3",
        },
      ],
    },
  });
};

export const getHodOverview = (req: Request, res: Response): void => {
  const authReq = req as AuthRequest;

  res.status(200).json({
    success: true,
    message: "HOD overview fetched successfully",
    data: {
      user: authReq.user,
      department: "Department of Computer Applications",
      overview: {
        facultyCount: 18,
        studentCount: 240,
        pendingComplaints: 9,
        attendanceAverage: "87%",
      },
    },
  });
};

export const getAdminUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: {
      count: users.length,
      users,
    },
  });
};