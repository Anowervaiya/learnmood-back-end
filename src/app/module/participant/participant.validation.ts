import z from "zod";
import { EntityType } from "../../constant/constant";

// Participant schema
export const participantZodSchema = z.object({
  entityId: z.any(),
  entityType: z.enum(Object.values(EntityType)),
  user: z.any(), // Mongoose ObjectId can be string or object
  joinedAt: z.string().optional(), // ISO date string
  progress: z.number().min(0).max(100).optional(),
  completed: z.boolean().optional(),
});
