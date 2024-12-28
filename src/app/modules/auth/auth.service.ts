import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // if user is exists
  const user = await User.isUserExists(payload?.email);
  console.log(user);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${payload?.email} in not exists`,
    );
  }

  if (user.isBlocked === true) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `This ${payload?.email} is blocked`,
    );
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, `Password do not mached`);
  }

  // create token and send to client

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  return { accessToken };
};

export const AuthService = {
  loginUser,
};
