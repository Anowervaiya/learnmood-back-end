import { z } from 'zod';
import { PAGE_CATEGORY } from './page.constant';

export const createPageZodSchema = z.object({
  name: z.string().trim().min(1, { message: 'Page name is required' }),
  description: z.string().trim().optional(),
  owner: z.string().min(1, { message: 'Owner ID is required' }), // You might want to use a more specific validation for ObjectId strings if you have a custom utility for that.
  category: z.enum(Object.values(PAGE_CATEGORY)).default(PAGE_CATEGORY.other),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  isPublic: z.boolean().default(true),
});
