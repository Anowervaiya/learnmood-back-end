import { Router } from 'express';
import { PageControllers } from './page.controller';

import { validateRequest } from '../../middlewares/validateRequest';

import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';
import {
  createPageMemberZodValidation,
  createPageZodValidation,
  updatePageZodValidatoin,
} from './page.validation';
import { multerUpload } from '../../config/multer.config';
import { PAGE_ROLE } from './page.constant';

const router = Router();
router.post(
  '/create',

  checkAuth(...Object.values(Role)),
  multerUpload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  validateRequest(createPageZodValidation),
  PageControllers.createPage
);

router.post(
  '/member/create',

  checkAuth(...Object.values(Role)),
  validateRequest(createPageMemberZodValidation),
  PageControllers.createPageMember
);

router.get('/all-pages', checkAuth(Role.ADMIN), PageControllers.getAllPages);

router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  multerUpload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  validateRequest(updatePageZodValidatoin),
  PageControllers.updatePage
);

router.delete('/:id',
  // checkAuth(Role.ADMIN),
  PageControllers.deletePage);
router.delete(
  '/member/:id',
  checkAuth(Role.USER),
  PageControllers.deletePageMember
);
export const PageRoutes = router;
