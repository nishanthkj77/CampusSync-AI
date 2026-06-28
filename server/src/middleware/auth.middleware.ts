 import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserRole } from "../models/user.model";
import { env } from "../utils/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
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

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Not authorized. User not found.",
      });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({
        success: false,
        message: "Account is inactive.",
      });
      return;
    }

    (req as AuthRequest).user = {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
};

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
      return;
    }

    if (!allowedRoles.includes(authReq.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission for this resource.",
      });
      return;
    }

    next();
  };
};