import { Router } from 'express';
import { UserControllers } from './user.controller';
import { checkAuth } from '../../middlewares/checkAuth';

import { validateRequest } from '../../middlewares/validateRequest';
import { Role } from './user.constant';
import { multerUpload } from '../../config/multer.config';
import { createUserZodValidation, updateUserZodValidation } from './user.validation';

const router = Router();
router.post(
  '/register',
  multerUpload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  validateRequest(createUserZodValidation),
  UserControllers.createUser
);

router.get('/all-users', checkAuth(Role.ADMIN), UserControllers.getAllUsers);
router.get('/me', checkAuth(...Object.values(Role)), UserControllers.getMe);
router.get(
  '/:id',
  checkAuth(...Object.values(Role)),
  UserControllers.getSingleUser
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  multerUpload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  validateRequest(updateUserZodValidation),
  UserControllers.updateUser
);
router.delete('/delete/:id', checkAuth(Role.ADMIN), UserControllers.deleteUser);

export const UserRoutes = router;
