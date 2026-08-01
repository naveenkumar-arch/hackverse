import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  body: z.object({
    registrationId: z.string().uuid('Invalid Registration UUID'),
    amount: z.number().min(0).default(499),
    paymentMethod: z.string().default('UPI'),
  }),
});

export const submitUtrSchema = z.object({
  body: z.object({
    paymentId: z.string().uuid('Invalid Payment UUID'),
    upiUtr: z.string().min(12, 'UPI UTR / Reference code must be 12 digits').max(12),
  }),
});

export const verifyPaymentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Payment UUID'),
  }),
  body: z.object({
    action: z.enum(['APPROVE', 'REJECT']),
    notes: z.string().optional(),
  }),
});
