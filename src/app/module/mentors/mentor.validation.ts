import { z } from 'zod';

export const createMentorZodSchema = z.object({
 
 
  subject: z
    .array(z.string().min(1, 'Subject cannot be empty'))
    .min(1, 'At least one subject is required'),
  experienceYears: z
    .string()
    .min(0, 'Experience years must be a positive number'),
  education: z.string().min(1, 'Education is required'),
  location: z.string().min(1, 'Location is required'),
  duration: z.string().min(1, 'Timezone is required'),
  monthlyRate: z.number().min(0, 'Monthly rate must be a positive number'),
});

export const updateMentorZodValidation = createMentorZodSchema.partial();
