import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';
import { createBloodDonorZodValidation, createBloodRequestZodValidation, updateBloodDonorZodValidatoin } from './blood.validation';
import { BloodControllers } from './blood.controller';

const router = Router();

router.post(
  '/become-donor',
  checkAuth(...Object.values(Role)),
  validateRequest(createBloodDonorZodValidation),
  BloodControllers.createBloodDonor
);

router.get(
  '/blood-donor',
  // checkAuth(Role.ADMIN),
  BloodControllers.getAllBloodDonors
);


router.post(
  '/blood-request',
  checkAuth(...Object.values(Role)),
  validateRequest(createBloodRequestZodValidation),
  BloodControllers.createBloodRequest
);

router.get(
  '/blood-request',
  // checkAuth(Role.ADMIN),
  BloodControllers.getAllBloodRequests
);


router.patch(
  '/become-donor/:id',
  checkAuth(...Object.values(Role)),
  validateRequest(updateBloodDonorZodValidatoin),
  BloodControllers.updateBloodDonor
);
router.patch(
  '/blood-request/:id',
  checkAuth(...Object.values(Role)),
  validateRequest(updateBloodDonorZodValidatoin),
  BloodControllers.updateBloodDonor
);

router.delete(
  '/become-donor/:id',
  // checkAuth(Role.ADMIN),
  BloodControllers.deleteBloodDonor
);
router.delete(
  '/blood-request/:id',
  checkAuth(Role.USER),
  BloodControllers.deleteBloodRequest
);
export const BloodRoutes = router;
