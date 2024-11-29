import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

// add new car section
router.post('/', CarControllers.createCar);

// get all car and searchTerm can be brand, model, category
router.get('/', CarControllers.getAllCar);

//get single car
router.get('/:carId', CarControllers.getSingleCar);

// PUT request to update a car
router.put('/:carId', CarControllers.updateCar);

// Deleted a car
router.delete('/:carId', CarControllers.DeleteCar);

export const CarRoutes = router;
