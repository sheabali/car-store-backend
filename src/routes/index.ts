import { Router } from 'express';

const router = Router();

const moduleRouter = [
  {
    path: '/users',
    router: UserRoutes,
  },
];
