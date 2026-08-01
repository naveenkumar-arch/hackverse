import { z } from 'zod';

export const createTemplateSchema = z.object({
  body: z.object({
    eventId: z.string().uuid('Invalid Event UUID'),
    name: z.string().min(2, 'Template name must be at least 2 characters'),
    templateType: z.enum(['Participation', 'Winner', 'Runner Up', 'Second Runner Up', 'Judge', 'Organizer']),
    templateUrl: z.string().url('Invalid Template URL'),
  }),
});

export const generateCertificateSchema = z.object({
  body: z.object({
    userId: z.string().uuid('Invalid User UUID'),
    eventId: z.string().uuid('Invalid Event UUID'),
    certificateType: z.enum(['Participation', 'Winner', 'Runner Up', 'Second Runner Up', 'Judge', 'Organizer']),
    recipientName: z.string().min(2, 'Recipient name is required'),
    eventName: z.string().min(2, 'Event name is required'),
  }),
});
