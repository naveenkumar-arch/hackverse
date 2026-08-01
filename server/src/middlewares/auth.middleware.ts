import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';
import { UserRole } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  approvalStatus?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export const authenticateJwt = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Authentication token missing or invalid format');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthenticatedUser;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, approvalStatus: true },
    });

    if (!user) {
      throw ApiError.unauthorized('User associated with token no longer exists');
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Authentication token has expired'));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(ApiError.unauthorized('Invalid authentication token'));
    }
    next(error);
  }
};

export const requireApprovedStudent = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw ApiError.unauthorized('Authentication required');
    }

    if (req.user.role === UserRole.ADMIN) {
      return next(); // Admins automatically pass
    }

    const fullUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { approvalStatus: true },
    });

    if (!fullUser || fullUser.approvalStatus !== 'APPROVED') {
      throw ApiError.forbidden(
        'Your student account is currently Pending Approval. An administrator must approve your account before you can register for events or create/join teams.'
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
