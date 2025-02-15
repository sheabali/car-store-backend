import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ROLE } from '../../Constant/role.constant';
const router = express.Router();

router.get('/verify', auth(ROLE.user), OrderController.verifyPayment);

router.post('/', auth(ROLE.user), OrderController.createOrder);
router.get('/', auth(ROLE.user), OrderController.getOrders);
router.delete('/:id', auth(ROLE.user), OrderController.deleteOrders);
// .post(auth(UserRole.user), orderController.createOrder)
// Get revenue
router.get('/revenue', OrderController.getRevenue);

export const OrderRouter = router;
