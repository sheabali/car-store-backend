import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { orderValidationSchema } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // Data validation using zod
    const zodparsedData = orderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderInDB(zodparsedData);

    res.status(201).json({
      status: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error : 'Something Went wrong.',
    });
  }
};

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
