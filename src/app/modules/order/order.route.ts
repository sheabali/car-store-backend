import { Router } from 'express';
import { OrderController } from './order.controller';

const orderRouter = Router();

// Place an order
orderRouter.post('/', OrderController.createOrder);

// Get revenue
orderRouter.get('/revenue', OrderController.getRevenue);

export { orderRouter };
