import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/user',
  validateRequest(userValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
