import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
