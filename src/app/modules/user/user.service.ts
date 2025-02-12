import AppError from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
const blockUser = async (_id: string) => {
  console.log('blocked', _id);
  // const userId = id;
  const result = await User.findByIdAndUpdate(
    _id,
    { status: 'blocked' },
    { new: true },
  );

  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};
const getAllUser = async () => {
  const result = await User.find();
  return result;
};
const changePasswordIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

export const userServices = {
  createUserIntoDB,
  changePasswordIntoDB,
  blockUser,
  getAllUser,
};
