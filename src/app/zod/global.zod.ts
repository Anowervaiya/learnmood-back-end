import z from "zod";
import { EntityType } from "../constant/constant";



export const ImageZodValidation = z.object({
  profile: z.url(),
  banner: z.url()
});



// Media schema
export const mediaZodValidation = z.object({
  url: z.url(),
  type: z.enum(['image', 'video']), // adjust types if needed
});
