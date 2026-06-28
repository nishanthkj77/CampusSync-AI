import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createAttendanceService,
  getAttendanceService,
  updateAttendanceService,
} from "../services/attendance.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const createAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await createAttendanceService(req.body, req as AuthRequest);

    res.status(201).json({
      success: true,
      message: "Attendance record created successfully",
      data: {
        attendance: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const getAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAttendanceService(req as AuthRequest);

    res.status(200).json({
      success: true,
      message: "Attendance records fetched successfully",
      data: {
        count: result.length,
        attendance: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const updateAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const attendanceId = req.params.id as string;

    if (!attendanceId) {
      res.status(400).json({
        success: false,
        message: "Attendance ID is required",
      });
      return;
    }

    const result = await updateAttendanceService(attendanceId, req.body);

    res.status(200).json({
      success: true,
      message: "Attendance record updated successfully",
      data: {
        attendance: result,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};