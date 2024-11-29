import { Request, Response } from 'express';
import { carServices } from './car.service';
import { carValidationSchema } from './car.validation';

const createCar = async (req: Request, res: Response) => {
  try {
    const { car: carData } = req.body;

    // Data validation using zod
    const zodparsedData = carValidationSchema.parse(carData);

    const result = await carServices.createCarIntoDB(zodparsedData);
    res.status(200).json({
      status: true,
      message: 'Car created successfßully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: err,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
};

const getAllCar = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    // Call the service layer with the search term
    const cars = await carServices.getAllCarFromDB(searchTerm as string);

    res.status(200).json({
      message: 'Cars retrieved successfully',
      success: true,
      data: cars,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: err,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
};

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;

    const result = await carServices.getSingleCarFromDB(carId);

    res.status(200).json({
      success: true,
      message: 'Car is retivieved successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: err,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
};

// Update car
const updateCar = async (req: Request, res: Response) => {
  try {
    // Get carId from the request parameters
    const { carId } = req.params;
    const updateData = req.body;

    const updatedCar = await carServices.updateCarIntoDB(carId, updateData);

    res.status(200).json({
      message: 'Car updated successfully',
      success: true,
      data: updatedCar,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: err,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
};

// Deleted Car
const DeleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    await carServices.deletedCarFromDB(carId);

    res.status(200).json({
      message: 'Car deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: err,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }
};

export const CarControllers = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  DeleteCar,
};
