import z from "zod";



export const ImageZodValidation = z.object({
  profile: z.url(),
  banner: z.url()
});

export const followersZodValidation = z.object({
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ObjectId'),
});

// Media schema
export const mediaZodValidation = z.object({
  url: z.url(),
  type: z.enum(['image', 'video']), // adjust types if needed
});
