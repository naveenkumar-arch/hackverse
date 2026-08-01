import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createTeamSchema, joinTeamSchema, actionMemberSchema } from '../validations/team.validation';
import { UserRole } from '@prisma/client';

const router = Router();
const teamController = new TeamController();

router.post('/', authenticateJwt, validateRequest(createTeamSchema), teamController.createTeam);
router.post('/join', authenticateJwt, validateRequest(joinTeamSchema), teamController.joinTeam);
router.get('/my-team', authenticateJwt, teamController.getMyTeam);

router.post('/:id/accept-member', authenticateJwt, validateRequest(actionMemberSchema), teamController.acceptMember);
router.post('/:id/reject-member', authenticateJwt, validateRequest(actionMemberSchema), teamController.rejectMember);
router.delete('/:id/remove-member/:userId', authenticateJwt, teamController.removeMember);

router.post('/:id/transfer-leadership', authenticateJwt, validateRequest(actionMemberSchema), teamController.transferLeadership);
router.put('/:id/lock', authenticateJwt, teamController.toggleLock);
router.delete('/:id', authenticateJwt, teamController.deleteTeam);

router.post('/:id/register-event', authenticateJwt, teamController.registerTeamForEvent);

// Admin route
router.get('/admin/all', authenticateJwt, authorizeRoles(UserRole.ADMIN), teamController.getAllTeamsAdmin);

export default router;
