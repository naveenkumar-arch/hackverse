import { Router } from 'express';
import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import teamRoutes from './team.routes';
import userRoutes from './user.routes';
import submissionRoutes from './submission.routes';
import certificateRoutes from './certificate.routes';
import paymentRoutes from './payment.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/teams', teamRoutes);
router.use('/users', userRoutes);
router.use('/submissions', submissionRoutes);
router.use('/certificates', certificateRoutes);
router.use('/payments', paymentRoutes);
router.use('/admin', adminRoutes);

export default router;
