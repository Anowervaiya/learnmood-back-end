import z from 'zod';
import { GENDER, IsActive, LANGUAGE, PRONOUN, Role } from './user.constant';
import {   ImageZodValidation } from '../../zod/global.zod';
import { BLOOD_GROUP } from '../blood/blood.constant';


 const authProviderZodValidation = z.object({
  provider: z.string().min(1, 'Provider is required'),
  providerId: z.string().min(1, 'ProviderId is required'),
});
export const createUserZodValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.coerce.date({
    error: 'Date of birth must be a valid date',
  }),
  email: z.email('Invalid email'),
  gender: z.enum(Object.values(GENDER)),
  bloodGroup: z.enum(Object.values(BLOOD_GROUP)),
  nickname: z.string().optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  phone: z.string().optional(),
  profile: z.url('Profile must be a valid URL').optional(),
  banner: z.url('Banner must be a valid URL').optional(),
  image: z.array(ImageZodValidation).optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  friends: z.array(z.string()).optional(),
  role: z.enum(Object.values(Role)).default(Role.USER),
  pronoun: z.enum(Object.values(PRONOUN)).optional(),
  languages: z.array(z.enum(Object.values(LANGUAGE))).optional(),
  isActive: z.enum(Object.values(IsActive)).default(IsActive.ACTIVE),
  isVerified: z.boolean().default(false),
  isDeleted: z.boolean().default(false),

  auths: z.array(authProviderZodValidation).optional(),
});


export const updateUserZodValidation = createUserZodValidation.partial();//make all field are optional in updating
