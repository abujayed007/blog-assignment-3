import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { BlogRoute } from '../modules/blog/blog.route';
import { AdminRoute } from '../modules/admin/admin.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/blogs',
    route: BlogRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
