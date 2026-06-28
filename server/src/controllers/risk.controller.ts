import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getRiskPredictionService } from "../services/risk.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const getRiskPredictions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getRiskPredictionService(req as AuthRequest);

    res.status(200).json({
      success: true,
      message: "AI risk predictions generated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};