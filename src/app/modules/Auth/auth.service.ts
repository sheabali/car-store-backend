import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { createToken } from './auth.utils';
import config from '../../config';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // Check if the user exists using the email
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    Number(config.jwt_access_expires_in),
  );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string,
  // );

  return {
    accessToken,
    // refreshToken,
    // needsPasswordChange: user?.needsPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // Checking if the user exists
  const user = await User.isUserExistsByCustomId(userData.userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  // Checking if the old password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match!');
  }

  // Hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // Update the user's password in the database
  await User.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
