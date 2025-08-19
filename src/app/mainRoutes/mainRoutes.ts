import { Router } from 'express';
import { UserRoutes } from '../module/user/user.routes';
import { AuthRoutes } from '../module/auth/auth.route';
import { PostRoutes } from '../module/post/post.route';
import { CommentRoutes } from '../module/comments/comment.route';


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
 

  // {
  //     path: "/tour",
  //     route: TourRoutes
  // },
];

moduleRoutes.forEach(route => {
  if (route.route) {
    mainRoutes.use(route.path, route.route);
  }
});
