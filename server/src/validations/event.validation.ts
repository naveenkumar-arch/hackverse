import { z } from 'zod';
import { EventType, EventStatus, EventMode } from '@prisma/client';

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    shortDescription: z.string().max(500, 'Short description cannot exceed 500 characters'),
    theme: z.string().optional(),
    rules: z.string().optional(),
    judgingCriteria: z.string().optional(),
    bannerUrl: z.string().url().optional(),
    logoUrl: z.string().url().optional(),
    eventType: z.nativeEnum(EventType),
    status: z.nativeEnum(EventStatus).optional().default(EventStatus.DRAFT),
    mode: z.nativeEnum(EventMode),
    venue: z.string().optional(),
    maxTeamSize: z.number().int().min(1).default(4),
    minTeamSize: z.number().int().min(1).default(1),
    prizePool: z.string().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    registrationDeadline: z.string().datetime(),
    submissionDeadline: z.string().datetime(),
    isRegistrationOpen: z.boolean().optional().default(true),
    isSubmissionOpen: z.boolean().optional().default(true),
  }),
});

export const updateEventSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid event UUID'),
  }),
  body: createEventSchema.shape.body.partial(),
});
