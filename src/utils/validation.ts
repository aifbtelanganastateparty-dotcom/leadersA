/**
 * Input validation utilities using Zod
 * Provides type-safe validation for user inputs
 */

import { z } from 'zod';

// Common schemas
const emailSchema = z.string().email('Invalid email address');
const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');
const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(1000, 'Message must be less than 1000 characters');
const phoneSchema = z.string().regex(/^\+?[0-9\s-]{10,15}$/, 'Invalid phone number');

// Form schemas
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
  phone: phoneSchema.optional(),
});

export const donationFormSchema = z.object({
  amount: z.number().min(100, 'Minimum donation is ₹100'),
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
    .optional(),
});

export const reportIssueSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: messageSchema,
  location: z.string().min(3, 'Location must be specified'),
  category: z.enum(['corruption', 'infrastructure', 'service', 'other']),
  evidence: z.instanceof(File).optional(),
});

// Validation function
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((err: z.ZodIssue) => {
        const path = (err.path as Array<string | number>).join('.');
        return `${path}: ${err.message}`;
      });
      throw new Error(errorMessages.join('\n'), { cause: error });
    }
    throw new Error('Validation failed', { cause: error });
  }
}

// Type-safe form data extraction
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type DonationFormData = z.infer<typeof donationFormSchema>;
export type ReportIssueData = z.infer<typeof reportIssueSchema>;
