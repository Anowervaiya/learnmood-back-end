import { z } from 'zod';
import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from './challenge.contant';
import { mediaZodValidation } from '../../zod/global.zod';



// daysSchema 
export const createdaysZodSchema = z.object({
  challengeId: z.any(),
  dayNumber: z.number(),
  title: z.string(),
  video: z.array(z.object({
    fileName: z.string(),
    fileType: z.string(),
    key: z.string(),
    uploadUrl:z.string()
  })).optional(),
  notes: z.array(z.string()).optional(),
  article: z.string().optional(),
});


// Challenge schema
export const createChallengeZodValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum(Object.values(CHALLENGE_CATEGORY)),
  price:z.number().min(1,'price is required'),
  durationDays: z.number().min(1).default(30),
  createdBy: z.any().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  ratings: z.number().optional().default(0),
  isPublic: z.boolean().optional().default(true),
  status: z
    .enum(Object.values(CHALLENGE_STATUS))
    .optional()
    .default(CHALLENGE_STATUS.ongoing),
  banner: z.string().optional(),
});

export const updateChallengeZodValidation = createChallengeZodValidation.partial();

