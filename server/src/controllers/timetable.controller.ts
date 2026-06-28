 import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createTimetableService,
  deleteTimetableService,
  getAllTimetablesService,
  getMyTimetableService,
  updateTimetableService,
} from "../services/timetable.service";
import { getTimetableConflictsService } from "../services/timetableConflict.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const createTimetable = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await createTimetableService(req.body, req as AuthRequest);

    res.status(201).json({
      success: true,
      message: "Timetable entry created successfully",
      data: {
        timetable: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const getAllTimetables = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllTimetablesService();

    res.status(200).json({
      success: true,
      message: "Timetable entries fetched successfully",
      data: {
        count: result.length,
        timetables: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const getMyTimetable = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getMyTimetableService(req as AuthRequest);

    res.status(200).json({
      success: true,
      message: "My timetable fetched successfully",
      data: {
        count: result.length,
        timetables: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const getTimetableConflicts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getTimetableConflictsService();

    res.status(200).json({
      success: true,
      message: "Timetable conflict analysis completed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const updateTimetable = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const timetableId = req.params.id as string;

    if (!timetableId) {
      res.status(400).json({
        success: false,
        message: "Timetable ID is required",
      });
      return;
    }

    const result = await updateTimetableService(timetableId, req.body);

    res.status(200).json({
      success: true,
      message: "Timetable entry updated successfully",
      data: {
        timetable: result,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const deleteTimetable = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const timetableId = req.params.id as string;

    if (!timetableId) {
      res.status(400).json({
        success: false,
        message: "Timetable ID is required",
      });
      return;
    }

    const result = await deleteTimetableService(timetableId);

    res.status(200).json({
      success: true,
      message: "Timetable entry deleted successfully",
      data: {
        timetable: result,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};