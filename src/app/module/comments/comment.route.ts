import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { commentController } from './comment.controller';
import { Role } from '../user/user.constant';

const router = Router();

router.post(
  '/create',
  checkAuth(...Object.values(Role)),
  // multerUpload.array('files'),
  // validateRequest(createPostZodValidation),
  commentController.createcomment
);

router.delete(
  '/:id',
  checkAuth(...Object.values(Role)),
  commentController.deleteComment
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  // multerUpload.array('files'),
  // validateRequest(updateTourZodSchema),
  commentController.updateComment
);

export const CommentRoutes = router;
