import { Response } from 'express';
import { TeamService } from '../services/team.service';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public createTeam = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const team = await this.teamService.createTeam(req.user!.id, req.body);
    return ApiResponse.created(res, 'Team created successfully', team);
  });

  public joinTeam = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.joinTeam(req.user!.id, req.body);
    return ApiResponse.success(res, 'Join request submitted successfully', result);
  });

  public getMyTeam = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.getMyTeam(req.user!.id);
    return ApiResponse.success(res, 'My Team data retrieved', result);
  });

  public acceptMember = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.acceptMember(req.user!.id, req.params.id, req.body.targetUserId);
    return ApiResponse.success(res, 'Member accepted into team', result);
  });

  public rejectMember = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.rejectMember(req.user!.id, req.params.id, req.body.targetUserId);
    return ApiResponse.success(res, 'Join request rejected', result);
  });

  public removeMember = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.removeMember(req.user!.id, req.params.id, req.params.userId);
    return ApiResponse.success(res, 'Member removed from team', result);
  });

  public transferLeadership = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.transferLeadership(req.user!.id, req.params.id, req.body.targetUserId);
    return ApiResponse.success(res, result.message, result);
  });

  public toggleLock = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.toggleLock(req.user!.id, req.params.id);
    return ApiResponse.success(res, 'Team lock status updated', result);
  });

  public deleteTeam = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.deleteTeam(req.user!.id, req.params.id);
    return ApiResponse.success(res, 'Team deleted successfully', result);
  });

  public registerTeamForEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.teamService.registerTeamForEvent(req.user!.id, req.params.id);
    return ApiResponse.success(res, result.message, result);
  });

  public getAllTeamsAdmin = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const teams = await this.teamService.getAllTeamsAdmin();
    return ApiResponse.success(res, 'All teams fetched for Admin', teams);
  });
}
