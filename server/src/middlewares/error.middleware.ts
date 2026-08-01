import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { logger } from '../utils/logger';
import { env } from '../config/env.config';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = err;

  // Handle Prisma Known Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])?.join(', ') || 'field';
      error = ApiError.conflict(`Duplicate value entered for ${field}`);
    } else if (err.code === 'P2025') {
      error = ApiError.notFound('Requested entity record was not found');
    } else {
      error = ApiError.badRequest(`Database operation failed: ${err.message}`);
    }
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  logger.error(`[HTTP Exception] ${statusCode} - ${message} - Stack: ${error.stack}`);

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(error.errors && { errors: error.errors }),
    ...(env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
