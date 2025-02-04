import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ROLE } from '../../Constant/role.constant';
const router = express.Router();

router.post('/', auth(ROLE.user), OrderController.createOrder);
// .post(auth(UserRole.user), orderController.createOrder)
// Get revenue
router.get('/revenue', OrderController.getRevenue);

export const OrderRouter = router;
