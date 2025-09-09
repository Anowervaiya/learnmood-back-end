import { z } from 'zod';
import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from './challenge.contant';
import { mediaZodValidation } from '../../zod/global.zod';


// Participant schema
const participantSchema = z.object({
  user: z.any(), // Mongoose ObjectId can be string or object
  joinedAt: z.string().optional(), // ISO date string
  progress: z.number().min(0).max(100).optional(),
  completed: z.boolean().optional(),
});

// Challenge schema
export const createChallengeZodValidation = z.object({
  _id: z.any().optional(), // Optional for updates
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum(Object.values(CHALLENGE_CATEGORY)),
  durationDays: z.number().min(1).default(30),
  createdBy: z.any(),
  participants: z.array(participantSchema).optional(),
  startsAt: z.string().optional(), // ISO date string
  endsAt: z.string().optional(), // ISO date string
  rewardPoints: z.number().optional().default(100),
  badges: z.array(z.string()).optional().default([]),
  ratings: z.number().optional().default(0),
  isPublic: z.boolean().optional().default(true),
  status: z
    .enum(Object.values(CHALLENGE_STATUS))
    .optional()
    .default(CHALLENGE_STATUS.ongoing),
  media: z.array(mediaZodValidation).optional(),
});
