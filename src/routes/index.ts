import { Router } from 'express';
import { UserRoutes } from '../app/modules/user/user.route';

const router = Router();

const moduleRouter = [
  {
    path: '/users',
    router: UserRoutes,
  },
];
