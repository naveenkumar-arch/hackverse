import { Response } from 'express';
import { SubmissionService } from '../services/submission.service';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class SubmissionController {
  private submissionService: SubmissionService;

  constructor() {
    this.submissionService = new SubmissionService();
  }

  public submitProject = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const submission = await this.submissionService.submitProject(req.user!.id, req.body);
    return ApiResponse.created(res, 'Project submitted successfully', submission);
  });

  public getTeamSubmission = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const submission = await this.submissionService.getTeamSubmission(req.params.teamId);
    return ApiResponse.success(res, 'Team submission retrieved', submission);
  });
}
