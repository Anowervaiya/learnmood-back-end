import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { PostController } from './post.controller';
import { createPostZodValidation, updatePostZodValidation } from './post.validation';
import { multerUpload } from '../../config/multer.config';
import { Role } from '../user/user.constant';
import { PAGE_ROLE } from '../page/page.constant';

const router = Router();

router.post(
  '/create',
  checkAuth([...Object.values(Role),...Object.values(PAGE_ROLE)]),
  multerUpload.array('files'),
  validateRequest(createPostZodValidation),
  PostController.createPost
);

router.get('/', PostController.getAllPosts)


router.get('/:id',
  // checkAuth([...Object.values(Role), ...Object.values(PAGE_ROLE)]),
  PostController.getPostDetails)

router.delete(
  '/:id',
  checkAuth([...Object.values(Role),...Object.values(PAGE_ROLE)]),
  PostController.deletePost
);
router.patch(
  '/:id',
  checkAuth([...Object.values(Role),...Object.values(PAGE_ROLE)]),
  multerUpload.array('files'),
  validateRequest(updatePostZodValidation),
  PostController.updatePost
);

export const PostRoutes = router;
