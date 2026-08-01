import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);
    return ApiResponse.created(res, 'User registered successfully', result);
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);
    return ApiResponse.success(res, 'Login successful', result);
  });

  public forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.forgotPassword(req.body.email);
    return ApiResponse.success(res, result.message, result);
  });

  public resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.resetPassword(req.body.token, req.body.password);
    return ApiResponse.success(res, result.message);
  });

  public refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.refreshToken(req.body.refreshToken);
    return ApiResponse.success(res, 'Token refreshed successfully', result);
  });

  public logout = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.logout(req.body.refreshToken);
    return ApiResponse.success(res, result.message);
  });
}
