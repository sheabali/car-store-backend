import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is created succesfully',
    data: result,
  });
});
const blockUser = catchAsync(async (req, res) => {
  const user = await userServices.blockUser(req.params.id);
  console.log(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Block successfully',
    data: user,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const user = await userServices.getAllUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await userServices.changePasswordIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password Change succesfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  blockUser,
  changePassword,
};
