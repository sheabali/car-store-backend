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
router.patch('/:id', UserControllers.blockUser);
router.get('/', UserControllers.getAllUser);

export const UserRoutes = router;
