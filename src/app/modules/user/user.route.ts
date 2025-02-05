import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { userValidationSchema } from './user.validation';
import auth from '../../middlewares/auth';
import { ROLE } from '../../Constant/role.constant';

const router = express.Router();

router.post(
  '/',
  // auth(ROLE.user),
  validateRequest(userValidationSchema),

  UserControllers.createUser,
);

export const UserRoutes = router;
