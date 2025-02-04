import QueryBuilder from '../../builder/QueryBuilder';
import { CarModel } from '../car.model';
import { CarSearchableFields } from './car.constant';
import { TCar } from './car.interface';

// interface CarQuery {
//   $or?: Array<{
//     brand?: RegExp;
//     model?: RegExp;
//     category?: RegExp;
//   }>;
//   searchTerm?: string;
// }

const createCarIntoDB = async (car: TCar) => {
  const result = await CarModel.create(car);
  return result;
};

const getAllCarFromDB = async (query: Record<string, unknown>) => {
  console.log('searchTram.......', query);
  const carQuery = new QueryBuilder(CarModel.find(), query)
    .search(CarSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await carQuery.modelQuery;
  const meta = await carQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleCarFromDB = async (_id: string) => {
  const result = await CarModel.findOne({ _id });

  return result;
};

const updateCarIntoDB = async (carId: string, updateData: Partial<TCar>) => {
  const updateCar = await CarModel.findByIdAndUpdate(
    carId,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  return updateCar;
};

const deletedCarFromDB = async (_id: string) => {
  const result = await CarModel.deleteOne({ _id });
  return result;
};

export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deletedCarFromDB,
};
