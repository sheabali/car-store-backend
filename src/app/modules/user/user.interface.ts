/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ROLE } from '../../Constant/role.constant';

export interface TUser {
  userId?: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
}

export type TUserRole = keyof typeof ROLE;
