import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';

import { validateRequest } from '../../middlewares/validateRequest';

import { multerUpload } from '../../config/multer.config';
import { Role } from '../user/user.constant';
import { ChallengeController } from './challenge.controller';
import { createChallengeZodValidation, createdaysZodSchema, updateChallengeZodValidation } from './challenge.validation';
import { PAGE_ROLE } from '../page/page.constant';

const router = Router();

router.post(
  '/create',
  checkAuth(Object.values(PAGE_ROLE)),
  multerUpload.single('file'),
  validateRequest(createChallengeZodValidation),
  ChallengeController.createChallenge
);

router.post(
  '/create-day',
  checkAuth(Object.values(PAGE_ROLE)),
  multerUpload.array('files'),
  validateRequest(createdaysZodSchema),
  ChallengeController.createChallengeDay
);


router.get('/', ChallengeController.getAllChallenges)

router.get('/:id',
  checkAuth([...Object.values(Role), ...Object.values(PAGE_ROLE)]),
   ChallengeController.getChallengeDetails)

router.delete(
  '/:id',
  checkAuth([...Object.values(PAGE_ROLE) , Role.ADMIN]),
  ChallengeController.deleteChallenge
);
router.patch(
  '/update-challenge/:id',
  checkAuth(Object.values(PAGE_ROLE)),
  multerUpload.array('files'),
  validateRequest(updateChallengeZodValidation),
  ChallengeController.updateChallenge
);


export const ChallengeRoutes = router;
