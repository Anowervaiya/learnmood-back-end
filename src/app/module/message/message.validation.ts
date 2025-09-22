import z from "zod";
import { mediaZodValidation } from "../../zod/global.zod";

export const createMessageZodValidation = z.object({

  receiverId: z.any(), // Same as above, for Mongoose ObjectId
  content: z.string().min(1),
  media: z.array(mediaZodValidation).optional(),
});
export const updateMessageZodValidation = createMessageZodValidation.partial()