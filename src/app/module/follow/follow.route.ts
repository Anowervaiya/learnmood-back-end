import express from 'express';
import { FollowController } from './follow.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { followZodSchema } from './follow.validation';


const router = express.Router();


router.post(
  '/create-follow',
  validateRequest(followZodSchema),
  FollowController.followPage
);


router.post(
  '/create-unfollow',
  validateRequest(followZodSchema),
  FollowController.unfollowPage
);


router.get('/all-followers/:pageId', FollowController.getFollowers);

// ✅ Get all followings of a User or Page
router.get('/all-followings/:id/:type', FollowController.getFollowings);

export const FollowRoutes = router;
