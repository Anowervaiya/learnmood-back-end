import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { MentorController } from './mentor.controller';
import {
  createMentorZodSchema,
  updateMentorZodValidation,
} from './mentor.validation';
import { Role } from '../user/user.constant';

const router = Router();

router.post(
  '/create',
  checkAuth(Object.values(Role)),
  validateRequest(createMentorZodSchema),
  MentorController.createMentor
);

router.get('/', MentorController.getAllMentors);

router.get('/my-purchased-mentors',
  checkAuth(Object.values(Role)),
  MentorController.getMyPurchasedMentors)

router.delete(
  '/:id',
  checkAuth(Object.values(Role)),
  MentorController.deleteMentor
);

router.patch(
  '/:id',
  checkAuth(Object.values(Role)),
  validateRequest(updateMentorZodValidation),
  MentorController.updateMentor
);

export const MentorRoutes = router;
