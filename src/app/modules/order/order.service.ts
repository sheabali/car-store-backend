import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { CarModel } from '../car.model';
import Order from '../order.model';
import { TUser } from '../user/user.interface';
import { orderUtils } from './order.utils';

// {
//   "email": "customer@example.com",
//   "car": "6749ec7b592046de8e7bc1ab",
//   "quantity": 2,
//   "totalPrice": 2000
// }

const createOrder = async (
  user: TUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  console.log('payload', payload);

  if (!payload?.products?.length)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await CarModel.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  const order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: 'N/A',
    customer_email: user.email,
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await orderUtils.makePayment(shurjopayPayload);

  return { order, payment };
};

const calculateRevenue = async () => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: 'cars',
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    // Flatten the carDetails array
    { $unwind: '$carDetails' },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$carDetails.price', '$quantity'], // Multiply price by quantity
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  // Return 0 if no orders exist
  return result.length > 0 ? result[0].totalRevenue : 0;
};

export const orderServices = {
  createOrder,
  calculateRevenue,
};
