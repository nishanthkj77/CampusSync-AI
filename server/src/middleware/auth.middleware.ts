import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../utils/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Not authorized. Token missing.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload & {
      userId: string;
    };

    (req as AuthRequest).user = {
      id: decoded.userId,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
};