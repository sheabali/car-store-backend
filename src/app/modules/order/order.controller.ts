import { Request, Response } from 'express';
import { orderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;

  const order = await orderServices.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderServices.calculateRevenue();
    res.status(200).json({
      status: true,
      message: 'Revenue calculated successfully',
      data: totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error : 'Something Went wrong.',
    });
  }
};

export const OrderController = {
  createOrder,
  getRevenue,
};
