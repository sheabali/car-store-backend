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
  if (!payload?.products?.length)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');

  const userExists = await Order.findOne({ user: user.userId });
  console.log('userExists', userExists);

  const products = payload.products;
  console.log('user suer', user.userId);
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

  let order = await Order.create({
    user: user?.userId,
    products: productDetails,
    totalPrice,
  });

  // payment integration

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: 'N/A',
    customer_address: 'N/A',
    customer_email: user.email,
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const getOrders = async () => {
  const data = await Order.find().populate('user').populate('products.product');
  return data;
};
const deleteOrders = async (id: string) => {
  const data = await Order.findByIdAndDelete(id);
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
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
  getOrders,
  verifyPayment,
  calculateRevenue,
  deleteOrders,
};
