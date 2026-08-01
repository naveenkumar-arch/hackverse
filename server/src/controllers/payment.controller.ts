import { Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  public initiatePayment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const payment = await this.paymentService.initiatePayment(req.user!.id, req.body);
    return ApiResponse.created(res, 'Payment transaction initiated', payment);
  });

  public submitUtr = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const payment = await this.paymentService.submitUtr(req.body);
    return ApiResponse.success(res, 'UPI UTR reference submitted for manual verification', payment);
  });

  public verifyPaymentAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const payment = await this.paymentService.verifyPaymentAdmin(req.params.id, req.body.action);
    return ApiResponse.success(res, `Payment status updated to ${payment.status}`, payment);
  });

  public getUserPayments = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const payments = await this.paymentService.getUserPayments(req.user!.id);
    return ApiResponse.success(res, 'User payment history retrieved', payments);
  });

  public getAllPaymentsAdmin = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const payments = await this.paymentService.getAllPaymentsAdmin();
    return ApiResponse.success(res, 'All payment transactions loaded for Admin', payments);
  });
}
