import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { updateProfileSchema, changePasswordSchema } from '../validations/auth.validation';

const router = Router();
const userController = new UserController();

router.get('/me', authenticateJwt, userController.getProfile);
router.put('/profile', authenticateJwt, validateRequest(updateProfileSchema), userController.updateProfile);
router.put('/change-password', authenticateJwt, validateRequest(changePasswordSchema), userController.changePassword);
router.get('/dashboard', authenticateJwt, userController.getDashboard);

export default router;
