import { CarModel } from '../car.model';
import { Car } from './car.interface';

interface CarQuery {
  $or?: Array<{
    brand?: RegExp;
    model?: RegExp;
    category?: RegExp;
  }>;
  searchTerm?: string;
}

const createCarIntoDB = async (car: Car) => {
  const result = await CarModel.create(car);
  return result;
};

const getAllCarFromDB = async (searchTerm?: string) => {
  const query: CarQuery = {};
  if (searchTerm) {
    // Case-insensitive regex
    const regex = new RegExp(searchTerm, 'i');
    query.$or = [{ brand: regex }, { model: regex }, { category: regex }];
  }

  // Fetch cars based on query
  return CarModel.find(query);
};

const getSingleCarFromDB = async (_id: string) => {
  const result = await CarModel.findOne({ _id });
  return result;
};

const updateCarIntoDB = async (carId: string, updateData: Partial<Car>) => {
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
