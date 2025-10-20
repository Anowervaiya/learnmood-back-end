import { z } from 'zod';
import { PAGE_CATEGORY, PAGE_ROLE } from './page.constant';
import { ImageZodValidation } from '../../zod/global.zod';

export const createPageZodValidation = z.object({
  name: z.string().trim().min(1, { message: 'Page name is required' }),
  description: z.string().trim().optional(),
  owner: z.string().min(1, { message: 'Owner ID is required' }).optional(), // You might want to use a more specific validation for ObjectId strings if you have a custom utility for that.
  category: z.enum(Object.values(PAGE_CATEGORY)).default(PAGE_CATEGORY.other),
  image: z.array(ImageZodValidation).optional(),
  isPublic: z.boolean().default(true),
});

export const createPageMemberZodValidation = z.object({
  page: z.string({ error: 'Page ID is required' }),
  user: z.string({ error: 'User ID is required' }),
  bio: z.string().trim().optional(),
  role: z.enum(PAGE_ROLE).default(PAGE_ROLE.user), // Sets a default role if not provided
  joinedAt: z.date().default(() => new Date()), // Sets a default joinedAt date
});

export const updatePageZodValidatoin = createPageZodValidation.partial()