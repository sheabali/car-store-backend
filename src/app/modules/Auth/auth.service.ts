import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { createToken } from './auth.utils';
import config from '../../config';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  // const isDeleted = user?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  // }

  // checking if the user is blocked

  // const userStatus = user?.status;

  // if (userStatus === 'blocked') {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  // }

  //checking if the password is correct

  // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
  //   throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
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

export const AuthServices = {
  loginUser,
};
