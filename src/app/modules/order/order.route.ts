import express from 'express';
import { OrderController } from './order.controller';
const router = express.Router();

router.post('/', OrderController.createOrder);

// Get revenue
router.get('/revenue', OrderController.getRevenue);

export const OrderRouter = router;
