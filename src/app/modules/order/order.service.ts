import { CarModel } from '../car.model';
import { OrderModel } from '../order.model';

const createOrderInDB = async (orderData: {
  email: string;
  car: string;
  quantity: number;
}) => {
  const { car, quantity } = orderData;

  // find the car to ensure it exists
  const carData = await CarModel.findById(car);
  if (!carData) {
    throw new Error('Car not found');
  }

  // Check inventory
  if (carData.quantity < quantity) {
    throw new Error('Insufficient stock available');
  }

  // Create the order
  const order = await OrderModel.create(orderData);

  // Update car inventory
  carData.quantity -= quantity;
  if (carData.quantity === 0) {
    carData.inStock = false;
  }
  await carData.save();

  return order;
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
  createOrderInDB,
  calculateRevenue,
};
