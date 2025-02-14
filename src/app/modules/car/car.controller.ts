import { Request, Response } from 'express';
import { carServices } from './car.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

// Create car
const createCar = catchAsync(async (req, res) => {
  const result = await carServices.createCarIntoDB(req.body);
  console.log(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Car create successfully',
    data: result,
  });
});

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

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Car are retrieved successfully',
    data: result,
  });
};

// Update car
const updateCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const updateData = req.body;
  const result = await carServices.updateCarIntoDB(carId, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Car update successfully',
    data: result,
  });
});
// Deleted Car
const DeleteCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  console.log('params', req.params);
  await carServices.deletedCarFromDB(carId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Car deleted successfully',
    success: true,
    data: {},
  });
});

export const CarControllers = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  DeleteCar,
};
