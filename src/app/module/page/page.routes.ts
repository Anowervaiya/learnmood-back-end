import { Router } from 'express';
import { PageControllers } from './page.controller';

import { validateRequest } from '../../middlewares/validateRequest';

import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';
import {
  createPageMemberZodValidation,
  createPageZodValidation,
} from './page.validation';
import { multerUpload } from '../../config/multer.config';
import { PAGE_ROLE } from './page.constant';

const router = Router();
router.post(
  '/create',
  // multerUpload.single("file"),
  validateRequest(createPageZodValidation),
  PageControllers.createPage
);

router.post(
  '/member/create',
  // checkAuth(PAGE_ROLE.user),
  validateRequest(createPageMemberZodValidation),
  PageControllers.createPageMember
);

router.get('/all-pages', checkAuth(Role.ADMIN), PageControllers.getAllPages);
router.get('/me', checkAuth(...Object.values(Role)), PageControllers.getMe);
router.get(
  '/:id',
  checkAuth(...Object.values(Role)),
  PageControllers.getSinglePage
);
// router.patch(
//   '/:id',
//   validateRequest(updatePageZodSchema),
//   checkAuth(...Object.values(Role)),
//   PageControllers.updatePage
// );

router.delete('/:id', checkAuth(Role.ADMIN), PageControllers.deletePage);
router.delete(
  '/member/:id',
  checkAuth(Role.USER),
  PageControllers.deletePageMember
);
export const PageRoutes = router;
