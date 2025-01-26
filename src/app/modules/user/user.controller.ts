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

export const UserControllers = { createUser };
