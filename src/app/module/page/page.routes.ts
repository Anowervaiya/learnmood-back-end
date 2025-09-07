import { Router } from 'express';
import { PageControllers } from './page.controller';


import { validateRequest } from '../../middlewares/validateRequest';


import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';
import { createPageZodSchema } from './page.validation';
import { multerUpload } from '../../config/multer.config';

const router = Router();
router.post(
  '/create',
  // multerUpload.single("file"),
  validateRequest(createPageZodSchema),
  PageControllers.createPage
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
router.delete('/delete/:id', checkAuth(Role.ADMIN), PageControllers.deletePage);

export const PageRoutes = router;
