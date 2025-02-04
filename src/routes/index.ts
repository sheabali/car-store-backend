import { Router } from 'express';
import { UserRoutes } from '../app/modules/user/user.route';
import { AuthRoutes } from '../app/modules/Auth/auth.routes';
import { CarRoutes } from '../app/modules/car/car.route';
import { OrderRouter } from '../app/modules/order/order.route';

const router = Router();

const moduleRouter = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
