import { z } from 'zod';

export const createSubmissionSchema = z.object({
  body: z.object({
    eventId: z.string().uuid('Invalid Event UUID'),
    teamId: z.string().uuid('Invalid Team UUID').optional(),
    title: z.string().min(2, 'Project title must be at least 2 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    repoUrl: z.string().url('Invalid GitHub Repository URL'),
    demoUrl: z.string().url('Invalid Live Demo URL').optional().or(z.literal('')),
    videoUrl: z.string().url('Invalid Video URL').optional().or(z.literal('')),
    presentationPdfUrl: z.string().url('Invalid Presentation PDF URL').optional().or(z.literal('')),
    techStack: z.array(z.string()).optional().default([]),
  }),
});
