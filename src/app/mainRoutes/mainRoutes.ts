import { Router } from 'express';
import { UserRoutes } from '../module/user/user.routes';
import { AuthRoutes } from '../module/auth/auth.route';


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
