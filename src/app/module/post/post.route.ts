import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { PostController } from './post.controller';
import { createPostZodValidation, updatePostZodValidation } from './post.validation';
import { multerUpload } from '../../config/multer.config';
import { Role } from '../user/user.constant';

const router = Router();

router.post(
  '/create',
  checkAuth(...Object.values(Role)),
  multerUpload.array('files'),
  validateRequest(createPostZodValidation),
  PostController.createPost
);

// router.get('/', PostController.getAllPosts); Querybuilder

router.delete(
  '/:id',
  checkAuth(...Object.values(Role)),
  PostController.deletePost
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  multerUpload.array('files'),
  validateRequest(updatePostZodValidation),
  PostController.updatePost
);

export const PostRoutes = router;
