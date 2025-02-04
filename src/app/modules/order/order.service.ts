import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { CarModel } from '../car.model';
import { OrderModel } from '../order.model';
import { TUser } from '../user/user.interface';

const createOrder = async (
  user: TUser,
  payload: { products: { product: string; quantity: number }[] },
) => {
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

  const order = await OrderModel.create({
    user,
    products: productDetails,
    totalPrice,
  });

  return { order };
};

const calculateRevenue = async () => {
  const result = await OrderModel.aggregate([
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
