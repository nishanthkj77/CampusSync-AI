import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createAnnouncementService,
  getAnnouncementsService,
} from "../services/announcement.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const createAnnouncement = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await createAnnouncementService(
      req.body,
      req as AuthRequest
    );

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: {
        announcement: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const getAnnouncements = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAnnouncementsService(req as AuthRequest);

    res.status(200).json({
      success: true,
      message: "Announcements fetched successfully",
      data: {
        count: result.length,
        announcements: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};