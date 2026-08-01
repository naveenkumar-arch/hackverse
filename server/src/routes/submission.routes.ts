import { Router } from 'express';
import { SubmissionController } from '../controllers/submission.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createSubmissionSchema } from '../validations/submission.validation';

const router = Router();
const submissionController = new SubmissionController();

router.post(
  '/',
  authenticateJwt,
  validateRequest(createSubmissionSchema),
  submissionController.submitProject
);

router.get(
  '/team/:teamId',
  authenticateJwt,
  submissionController.getTeamSubmission
);

export default router;
