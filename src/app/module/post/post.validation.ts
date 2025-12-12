import { z } from 'zod';
import { VISIBILITY } from '../../constant/constant';
import { mediaZodValidation } from '../../zod/global.zod';


 
export const createPostZodValidation = z.object({
  _id: z.any().optional(), // Mongoose ObjectId is a string or an object, z.any() is a safe bet
  content: z.string().min(1),
  media: z.array(mediaZodValidation).optional(),
  tag: z.array(z.string()).optional(),
  visibility: z.enum(Object.values(VISIBILITY))
});

export const updatePostZodValidation = createPostZodValidation.partial();
