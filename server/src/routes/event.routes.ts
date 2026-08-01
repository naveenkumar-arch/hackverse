import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createEventSchema, updateEventSchema } from '../validations/event.validation';
import { UserRole } from '@prisma/client';

const router = Router();
const eventController = new EventController();

router.get('/', eventController.getAllEvents);
router.get('/:slug', eventController.getEventBySlug);

router.post(
  '/',
  authenticateJwt,
  authorizeRoles(UserRole.ORGANIZER, UserRole.ADMIN),
  validateRequest(createEventSchema),
  eventController.createEvent
);

router.put(
  '/:id',
  authenticateJwt,
  authorizeRoles(UserRole.ORGANIZER, UserRole.ADMIN),
  validateRequest(updateEventSchema),
  eventController.updateEvent
);

router.delete(
  '/:id',
  authenticateJwt,
  authorizeRoles(UserRole.ADMIN),
  eventController.deleteEvent
);

router.patch(
  '/:id/toggle-registration',
  authenticateJwt,
  authorizeRoles(UserRole.ORGANIZER, UserRole.ADMIN),
  eventController.toggleRegistration
);

router.patch(
  '/:id/toggle-submission',
  authenticateJwt,
  authorizeRoles(UserRole.ORGANIZER, UserRole.ADMIN),
  eventController.toggleSubmission
);

router.get(
  '/admin/all',
  authenticateJwt,
  authorizeRoles(UserRole.ADMIN),
  eventController.getAllEventsAdmin
);

export default router;
