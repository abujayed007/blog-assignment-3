import { AuthenticatedRequest } from '../../middleware/auth';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserService.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result?._id,
      name: result.name,
      email: result.email,
    },
  });
});

const updateUserIsBlocked = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const { userId } = req.params;
    const result = await UserService.updateUserIsBlockedIntoDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User blocked successfully',
    });
  },
);

export const UserController = {
  registerUser,
  updateUserIsBlocked,
};
