import { TUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (payload: TUser) => {
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
