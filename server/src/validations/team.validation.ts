import { z } from 'zod';

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Team name must be at least 2 characters'),
    eventId: z.string().uuid('Invalid event UUID'),
    maxMembers: z.number().int().min(2).max(6).optional().default(4),
  }),
});

export const joinTeamSchema = z.object({
  body: z.object({
    teamIdCode: z.string().min(1, 'Team ID is required'),
    teamPassword: z.string().min(1, 'Team Password is required'),
  }),
});

export const actionMemberSchema = z.object({
  body: z.object({
    targetUserId: z.string().uuid('Invalid target user UUID'),
  }),
});
