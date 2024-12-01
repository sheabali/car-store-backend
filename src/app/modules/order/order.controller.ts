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
      message:
        error instanceof Error ? error.message : 'Failed to create order',
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
      message:
        error instanceof Error ? error.message : 'Failed to calculate revenue!',
    });
  }
};

export const OrderController = {
  createOrder,
  getRevenue,
};
