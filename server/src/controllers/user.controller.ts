import { Response } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await this.userService.getProfile(req.user!.id);
    return ApiResponse.success(res, 'User profile retrieved', user);
  });

  public updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const updatedUser = await this.userService.updateProfile(req.user!.id, req.body);
    return ApiResponse.success(res, 'Profile updated successfully', updatedUser);
  });

  public changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.userService.changePassword(
      req.user!.id,
      req.body.currentPassword,
      req.body.newPassword
    );
    return ApiResponse.success(res, result.message);
  });

  public getDashboard = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const data = await this.userService.getDashboardStats(req.user!.id);
    return ApiResponse.success(res, 'Dashboard data loaded successfully', data);
  });
}
