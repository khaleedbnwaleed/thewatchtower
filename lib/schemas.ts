import { z } from 'zod';

export const feedbackSchema = z.object({
  projectId: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  category: z.enum(['issue', 'suggestion', 'praise', 'other'], {
    errorMap: () => ({ message: 'Please select a feedback category' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  attachmentUrl: z.string().optional(),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;

export const adminLoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

export const projectFormSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  status: z.enum(['planning', 'ongoing', 'completed', 'paused']),
  category: z.enum(['infrastructure', 'education', 'health', 'water', 'energy', 'other']),
  budgetTotal: z.number().positive('Budget must be positive'),
  budgetSpent: z.number().nonnegative('Spent amount cannot be negative'),
  completionPercentage: z.number().min(0).max(100),
  startDate: z.string(),
  endDate: z.string(),
  contractor: z.string().min(1, 'Contractor name is required'),
  contact: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  latitude: z.number(),
  longitude: z.number(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
