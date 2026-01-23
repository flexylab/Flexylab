import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Password must contain uppercase letter').regex(/[0-9]/, 'Password must contain number').regex(/[!@#$%^&*]/, 'Password must contain special character'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  phone: z.string().optional().default(''),
});

export const SigninSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
});

export const VerifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  verificationCode: z.string().length(6, 'Invalid verification code'),
});

export const UpdateProfileSchema = z.object({
  userId: z.string().min(1, 'User ID required'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional().default(''),
  address: z.string().optional().default(''),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(5, 'Subject too short'),
  message: z.string().min(10, 'Message too short'),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
