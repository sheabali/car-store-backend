import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await userServices.createUserIntoDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Created Successfully.',
    data: result,
  });
});

export const UserControllers = { createUser };
