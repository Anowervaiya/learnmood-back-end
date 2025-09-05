import { Router } from 'express';
import { UserRoutes } from '../module/user/user.routes';
import { AuthRoutes } from '../module/auth/auth.route';
import { PostRoutes } from '../module/post/post.route';
import { CommentRoutes } from '../module/comments/comment.route';
import { ReactRoutes } from '../module/reacts/react.route';
import { OtpRoutes } from '../module/otp/otp.route';


export const mainRoutes = Router();


const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
 
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
 
  {
    path: '/comment',
    route: CommentRoutes,
  },
 

  {
      path: "/react",
      route: ReactRoutes
  },
  {
      path: "/otp",
      route: OtpRoutes
  },
];

moduleRoutes.forEach(route => {
  if (route.route) {
    mainRoutes.use(route.path, route.route);
  }
});
