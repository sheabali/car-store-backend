import { Request, Response } from 'express';
import { carServices } from './car.service';
import { carValidationSchema } from './car.validation';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// Create car
const createCar = async (req: Request, res: Response) => {
  try {
    // Data validation using zod
    const zodparsedData = carValidationSchema.parse(req.body);

    const result = await carServices.createCarIntoDB(zodparsedData);
    res.status(200).json({
      status: true,
      message: 'Car created successfßully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error instanceof Error ? error : 'Something Went wrong.',
    });
  }
};

const getAllCar = async (req: Request, res: Response) => {
  const result = await carServices.getAllCarFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Car are retrieved successfully',
    // meta: result.meta,
    data: result.result,
  });
};

const getSingleCar = async (req: Request, res: Response) => {
  const { carId } = req.params;

  const result = await carServices.getSingleCarFromDB(carId);
  console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Car are retrieved successfully',
    data: result,
  });
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
      status: true,
      data: updatedCar,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error instanceof Error ? error : 'Something Went wrong.',
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
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error : 'Something Went wrong.',
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
