import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const registerSchema = z
  .object({
    body: z.object({
      fullName: z.string().min(2, 'Full name must be at least 2 characters'),
      email: z.string().email('Invalid email address format'),
      phone: z.string().optional(),
      college: z.string().optional(),
      department: z.string().optional(),
      year: z.string().optional(),
      githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
      linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
      password: z.string().min(8, 'Password must be at least 8 characters long'),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
      role: z.nativeEnum(UserRole).optional().default(UserRole.STUDENT),
    }),
  })
  .refine((data) => data.body.password === data.body.confirmPassword, {
    message: 'Passwords do not match',
    path: ['body', 'confirmPassword'],
  });

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address format'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional().default(false),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address format'),
  }),
});

export const resetPasswordSchema = z
  .object({
    body: z.object({
      token: z.string().min(1, 'Token is required'),
      password: z.string().min(8, 'New password must be at least 8 characters long'),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
    }),
  })
  .refine((data) => data.body.password === data.body.confirmPassword, {
    message: 'Passwords do not match',
    path: ['body', 'confirmPassword'],
  });

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
    phone: z.string().optional(),
    college: z.string().optional(),
    department: z.string().optional(),
    year: z.string().optional(),
    bio: z.string().optional(),
    githubUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    avatarUrl: z.string().optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  }),
});
