import express from 'express';
import { FollowController } from './follow.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { followZodSchema } from './follow.validation';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';


const router = express.Router();


router.post(
  '/create-follow',
  checkAuth(...Object.values(Role)),
  validateRequest(followZodSchema),
  FollowController.followPage
);


router.post(
  '/create-unfollow',
  checkAuth(...Object.values(Role)),
  validateRequest(followZodSchema),
  FollowController.unfollowPage
);

// ✅ Get follow status
router.get('/status',
  checkAuth(...Object.values(Role)), FollowController.getFollowStatus);

router.get('/all-followers/:pageId', FollowController.getFollowers);

// ✅ Get all followings of a User or Page
router.get('/all-followings/:id/:type', FollowController.getFollowings);


export const FollowRoutes = router;
