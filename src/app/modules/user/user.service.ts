import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
const changePasswordIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

export const userServices = { createUserIntoDB, changePasswordIntoDB };
