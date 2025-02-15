import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { ROLE } from '../../Constant/role.constant';
import { carValidationSchema, updateCarSchema } from './car.validation';

const router = express.Router();

// add new car section
router.post(
  '/',
  auth(ROLE.admin),
  validateRequest(carValidationSchema),
  CarControllers.createCar,
);

// get all car and searchTerm can be brand, model, category
router.get('/', CarControllers.getAllCar);

//get single car
router.get('/:carId', CarControllers.getSingleCar);

// PUT request to update a car
router.patch(
  '/:carId',
  auth(ROLE.admin),
  validateRequest(updateCarSchema),
  CarControllers.updateCar,
);

// Deleted a car
router.delete('/:carId', auth(ROLE.admin), CarControllers.DeleteCar);

export const CarRoutes = router;
