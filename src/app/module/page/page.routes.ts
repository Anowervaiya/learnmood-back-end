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
  '/switch',
  checkAuth([]), // user must be logged in
  PageControllers.switchToPage
);

router.post(
  '/create',
  checkAuth(Object.values(Role)),
  multerUpload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  validateRequest(createPageZodValidation),
  PageControllers.createPage
);


router.get('/me', checkAuth(Object.values(PAGE_ROLE)), PageControllers.getMe);


router.get('/',
  // checkAuth([Role.ADMIN ]),
  PageControllers.getAllPages);


router.get(
  '/my-page',
  checkAuth(["ADMIN", "USER", "MODERATOR", "admin"]),
  PageControllers.getMyPage
);

router.post(
  '/member/create',

  checkAuth(Object.values(Role)),
  validateRequest(createPageMemberZodValidation),
  PageControllers.createPageMember
);

router.get(
  '/member',
  // checkAuth(Role.ADMIN),
  PageControllers.getAllPageMembers
);

router.get(
  '/:id',
  PageControllers.getSinglePage
);

router.patch(
  '/:id',
  checkAuth(Object.values(Role)),
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
  checkAuth([Role.USER]),
  PageControllers.deletePageMember
);
export const PageRoutes = router;
