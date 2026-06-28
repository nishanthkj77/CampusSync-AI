import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  generateAITimetablePreviewService,
  saveAITimetablePreviewService,
} from "../services/aiTimetable.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const generateAITimetablePreview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await generateAITimetablePreviewService(req.body);

    res.status(200).json({
      success: true,
      message: "AI timetable preview generated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const saveAITimetablePreview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await saveAITimetablePreviewService(
      req.body.entries,
      req as AuthRequest
    );

    res.status(201).json({
      success: true,
      message: "AI timetable saved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};