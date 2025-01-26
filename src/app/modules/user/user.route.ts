import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { userValidationSchema } from './user.validation';

const router = express.Router();
console.log('aaa', userValidationSchema);
router.post(
  '/',
  validateRequest(userValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
