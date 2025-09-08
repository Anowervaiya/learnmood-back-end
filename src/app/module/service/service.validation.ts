import z from "zod";
import { COURSE_LEVEL, SERVICE_CATEGORY } from "./service.constant";

const mediaSchema = z.object({
  url: z.array(z.url()),
  type: z.enum(['image', 'video']),
});

// Zod schema for the entire service model
export const createServiceZodSchema = z.object({
  page: z.string({ error: 'Page ID is required' }),
  user: z.string({ error: 'Creator ID is required' }),
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  category: z.enum(SERVICE_CATEGORY, {
    error: 'Service type is required',
  }),
  media: z.array(mediaSchema).optional(),
  price: z.number().nonnegative().optional(),
  duration: z.string().optional(),
  level: z.enum(COURSE_LEVEL).optional(),
  participants: z.array(z.string()).optional(),
});
