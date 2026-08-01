import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { initiatePaymentSchema, submitUtrSchema, verifyPaymentSchema } from '../validations/payment.validation';
import { UserRole } from '@prisma/client';

const router = Router();
const paymentController = new PaymentController();

router.post('/initiate', authenticateJwt, validateRequest(initiatePaymentSchema), paymentController.initiatePayment);
router.post('/submit-utr', authenticateJwt, validateRequest(submitUtrSchema), paymentController.submitUtr);
router.get('/my-payments', authenticateJwt, paymentController.getUserPayments);

// Admin routes
router.get('/admin/all', authenticateJwt, authorizeRoles(UserRole.ADMIN), paymentController.getAllPaymentsAdmin);
router.patch('/admin/:id/verify', authenticateJwt, authorizeRoles(UserRole.ADMIN), validateRequest(verifyPaymentSchema), paymentController.verifyPaymentAdmin);

export default router;
