import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';

const registerUserIntoDB = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload?.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'Email already in use');
  }
  const result = await User.create(payload);
  return result;
};

const updateUserIsBlockedIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const UserService = {
  registerUserIntoDB,
  updateUserIsBlockedIntoDB,
};
