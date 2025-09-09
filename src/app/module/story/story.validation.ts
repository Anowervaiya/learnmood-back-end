import { z } from 'zod';
import { mediaZodValidation } from '../../zod/global.zod';


 
export const createStoryZodValidation = z.object({
   
  _id: z.any().optional(), // Mongoose ObjectId is a string or an object, z.any() is a safe bet
  user: z.any(), // Same as above, for Mongoose ObjectId
  content: z.string().min(1),
    media: z.array(mediaZodValidation).optional(),
  tags: z.array(z.any()).optional(),
  reacts: z.array(z.any()).optional(), // Assuming IReact is a separate schema
  comments: z.array(z.any()).optional(), // Assuming IComments is a separate schema
  visibility: z.enum(['PUBLIC', 'FOLLOWERS', 'FRIENDS', 'ONLY_ME']),
});

