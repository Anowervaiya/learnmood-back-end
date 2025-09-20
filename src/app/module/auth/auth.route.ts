import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import passport from 'passport';
import { AuthConrollers } from './auth.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';

const router = Router();

router.post('/login', AuthConrollers.credentialsLogin);
router.post('/logout', AuthConrollers.logout);
router.post(
  '/set-password',
  checkAuth(...Object.values(Role)),
  AuthConrollers.setPassword
);

router.get(
  '/google',
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
  }
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  AuthConrollers.gooleCallbackController
);

export const AuthRoutes = router;
