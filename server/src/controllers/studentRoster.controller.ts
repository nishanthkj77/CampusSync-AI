import { Request, Response } from "express";
import User from "../models/user.model";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const getStudentRoster = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const department = String(req.query.department || "Computer Applications");
    const semester = Number(req.query.semester || 2);
    const section = String(req.query.section || "A").toUpperCase();

    const students = await User.find({
      role: "student",
      isActive: true,
      department,
      semester,
      section,
    })
      .select("name email rollNumber department semester section role")
      .sort({ rollNumber: 1, name: 1 });

    res.status(200).json({
      success: true,
      message: "Student roster fetched successfully",
      data: {
        count: students.length,
        students,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};