import { Router } from 'express';
import { UserControllers } from './user.controller';
import { checkAuth } from '../../middlewares/checkAuth';

import { validateRequest } from '../../middlewares/validateRequest';
import { Role } from './user.constant';
import { multerUpload } from '../../config/multer.config';
import {
  createUserZodValidation,
  updateUserZodValidation,
} from './user.validation';

const router = Router();
router.post(
  '/register',
  validateRequest(createUserZodValidation),
  UserControllers.createUser
);

router.get(
  '/',
  // checkAuth(Role.ADMIN),
  UserControllers.getAllUsers
);
router.get('/me', checkAuth(...Object.values(Role)), UserControllers.getMe);

router.get(
  '/recommended',
  checkAuth(...Object.values(Role)),
  UserControllers.getRecommendedUsers
); // recommended friends
router.get(
  '/my-friends',
  checkAuth(...Object.values(Role)),
  UserControllers.getMyFriends
); //my friends

router.get(
  '/incomming-friend-requests',
  checkAuth(...Object.values(Role)),
  UserControllers.getFriendRequests
); //get friend request(incomming , accepted)

router.get(
  '/outgoing-friend-requests',
  checkAuth(...Object.values(Role)),
  UserControllers.getOutgoingFriendRequest
); //sent friend request or outgoing request

router.post(
  '/friend-request/:id',
  checkAuth(...Object.values(Role)),
  UserControllers.sendFriendRequest
); //send friend request

router.patch(
  '/friend-request-status/:id',
  checkAuth(...Object.values(Role)),
  UserControllers.changeStatusOfFreindRequest
); //change Status Of Freind Request

router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  multerUpload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  validateRequest(updateUserZodValidation),
  UserControllers.updateUser
);

router.delete('/delete/:id', checkAuth(Role.ADMIN), UserControllers.deleteUser);

export const UserRoutes = router;
