import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200,
    meta?: Record<string, any>
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      ...(meta && { meta }),
    });
  }

  static created<T>(res: Response, message: string, data?: T) {
    return ApiResponse.success(res, message, data, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}
