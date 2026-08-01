import { Router } from 'express';
import { CertificateController } from '../controllers/certificate.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createTemplateSchema, generateCertificateSchema } from '../validations/certificate.validation';
import { UserRole } from '@prisma/client';

const router = Router();
const certificateController = new CertificateController();

router.get('/my-certificates', authenticateJwt, certificateController.getUserCertificates);
router.get('/verify/:id', certificateController.verifyCertificate);

// Admin routes
router.post(
  '/templates',
  authenticateJwt,
  authorizeRoles(UserRole.ADMIN),
  validateRequest(createTemplateSchema),
  certificateController.uploadTemplate
);

router.get(
  '/templates',
  authenticateJwt,
  authorizeRoles(UserRole.ADMIN),
  certificateController.getTemplates
);

router.post(
  '/generate',
  authenticateJwt,
  authorizeRoles(UserRole.ADMIN),
  validateRequest(generateCertificateSchema),
  certificateController.generateCertificate
);

export default router;
