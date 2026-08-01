import { Response, Request } from 'express';
import { CertificateService } from '../services/certificate.service';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class CertificateController {
  private certificateService: CertificateService;

  constructor() {
    this.certificateService = new CertificateService();
  }

  public uploadTemplate = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const template = await this.certificateService.uploadTemplate(req.body);
    return ApiResponse.created(res, 'Certificate template uploaded successfully', template);
  });

  public getTemplates = asyncHandler(async (_req: Request, res: Response) => {
    const templates = await this.certificateService.getTemplates();
    return ApiResponse.success(res, 'Templates fetched successfully', templates);
  });

  public generateCertificate = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const cert = await this.certificateService.generateCertificate(req.body);
    return ApiResponse.created(res, 'Certificate generated successfully', cert);
  });

  public verifyCertificate = asyncHandler(async (req: Request, res: Response) => {
    const cert = await this.certificateService.verifyCertificate(req.params.id);
    return ApiResponse.success(res, 'Certificate verified successfully', cert);
  });

  public getUserCertificates = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const certs = await this.certificateService.getUserCertificates(req.user!.id);
    return ApiResponse.success(res, 'User certificates retrieved', certs);
  });
}
