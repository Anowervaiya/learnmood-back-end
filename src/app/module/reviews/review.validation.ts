import { z } from 'zod';
import { EntityType } from '../../constant/constant';
export const createReviewZodValidation = z.object({
  _id: z.any().optional(),
  user: z.any(),
  entityId: z.any(),
  entityType: z.enum(Object.values(EntityType)),
  rating: z.number().min(1).max(5),
  message: z.string().min(1).max(500).optional()
});

export const updateReviewZodValidation = createReviewZodValidation.partial();
