import {
  z

} from 'zod';


import { mediaZodValidation } from '../../zod/global.zod';
import { EntityType } from '../../constant/constant';


export const createCommentZodValidation = z.object({
  entityType: z.enum(Object.values(EntityType), {
    error: 'Entity type is required',
  }),
  entityId: z.any(), // Same as above, for Mongoose ObjectId
  content: z.string().min(1),
  media: z.array(mediaZodValidation).optional(),
});
export const updateCommentZodValidation = createCommentZodValidation.partial()