import { z } from 'zod';
import { BLOOD_REQUEST_STATUS, BLOOD_URGENCY_LEVEL } from './blood.constant';



export const createBloodDonorZodValidation = z.object({
  bloodGroup: z.string().trim().min(1, { message: 'Blood Group is required' }),
  location: z.string().trim(),
  
});

export const createBloodRequestZodValidation = z.object({
  requestedBy: z.any(),
  bloodGroup: z.string().trim().min(1, { message: 'Blood Group is required' }),
  location: z.string().trim(),
  hospital: z.string().trim().optional(),
  contactNumber: z.string().trim(),
  urgencyLevel: z.enum(BLOOD_URGENCY_LEVEL).default(BLOOD_URGENCY_LEVEL.normal),
  details: z.string().optional(),
  status: z.enum(BLOOD_REQUEST_STATUS).default(BLOOD_REQUEST_STATUS.pending),
});

export const updateBloodDonorZodValidatoin = createBloodDonorZodValidation.partial();

export const updateBloodRequestZodValidatoin =
  createBloodRequestZodValidation.partial();