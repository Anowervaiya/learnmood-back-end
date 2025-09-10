import { Router } from 'express';


import { validateRequest } from '../../middlewares/validateRequest';


import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { createServiceZodSchema, updateServiceZodSchema } from './service.validation';
import { ServiceControllers } from './service.controller';

const router = Router();
router.post(
  '/create',

  checkAuth(...Object.values(Role)),
  multerUpload.array('files'),
  validateRequest(createServiceZodSchema),
  ServiceControllers.createService
);


router.get(
  '/',
  // checkAuth(Role.ADMIN),
  ServiceControllers.getAllService
);
router.get(
  '/:id',
  checkAuth(...Object.values(Role)),
  ServiceControllers.getSingleService
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  multerUpload.array('files'),
  validateRequest(updateServiceZodSchema),
  ServiceControllers.updateService
);

router.delete(
  '/:id',
  checkAuth(...Object.values(Role)),
  ServiceControllers.deleteService
);

export const ServiceRoutes = router;
