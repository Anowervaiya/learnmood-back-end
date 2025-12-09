import { z } from 'zod';
import { FOLLOWER_TYPE } from './follow.constant';

export const followZodSchema = z.object({
  followerType: z.enum(Object.values(FOLLOWER_TYPE)),
  followingId: z.string().min(1, 'Following ID is required'),
});
