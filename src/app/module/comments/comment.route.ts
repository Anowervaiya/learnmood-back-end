import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { commentController } from './comment.controller';
import { Role } from '../user/user.constant';
import { createCommentZodValidation, updateCommentZodValidation } from './comment.validation';
import { multerUpload } from '../../config/multer.config';
import { PAGE_ROLE } from '../page/page.constant';

const router = Router();

router.post(
  '/',
  checkAuth([...Object.values(Role),...Object.values(PAGE_ROLE)]),
  multerUpload.array('files'),
  validateRequest(createCommentZodValidation),
  commentController.createcomment
);

router.get('/', commentController.getAllComments);

router.delete(
  '/:id',
  checkAuth(Object.values(Role)),
  commentController.deleteComment
);
router.patch(
  '/:id',
  checkAuth(Object.values(Role)),
  multerUpload.array('files'),
  validateRequest(updateCommentZodValidation),
  commentController.updateComment
);

export const CommentRoutes = router;
