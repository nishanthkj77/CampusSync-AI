import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createComplaintService,
  getComplaintsService,
  updateComplaintStatusService,
} from "../services/complaint.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const createComplaint = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await createComplaintService(req.body, req as AuthRequest);

    res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: {
        complaint: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const getComplaints = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getComplaintsService(req as AuthRequest);

    res.status(200).json({
      success: true,
      message: "Complaints fetched successfully",
      data: {
        count: result.length,
        complaints: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

export const updateComplaintStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const complaintId = req.params.id as string;

    if (!complaintId) {
      res.status(400).json({
        success: false,
        message: "Complaint ID is required",
      });
      return;
    }

    const result = await updateComplaintStatusService(
      complaintId,
      req.body,
      req as AuthRequest
    );

    res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      data: {
        complaint: result,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};