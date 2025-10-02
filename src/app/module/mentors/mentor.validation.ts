import { z } from 'zod';

export const createMentorZodSchema = z.object({
 
  bio: z
    .string()
    .min(1, 'Bio is required')
    .max(1000, 'Bio must be less than 1000 characters'),
  subject: z
    .array(z.string().min(1, 'Subject cannot be empty'))
    .min(1, 'At least one subject is required'),
  experienceYears: z
    .number()
    .int()
    .min(0, 'Experience years must be a positive number'),
  education: z.string().min(1, 'Education is required'),
  location: z.string().min(1, 'Location is required'),
  duration: z.string().min(1, 'Timezone is required'),
  monthlyRate: z.number().min(0, 'Monthly rate must be a positive number'),
});

export const updateMentorZodValidation = createMentorZodSchema.partial();
