import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import httpStatus from 'http-status';
import { TUserRole } from '../modules/User/user.interface';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const token = req?.headers?.authorization?.split(' ')[1];

      // if the token send from client

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized user',
        );
      }
      // check if token is valid
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized',
            );
          }
          console.log(decoded);
          const role = (decoded as JwtPayload).role;
          console.log('user', role);
          if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized',
            );
          }
          req.user = decoded as JwtPayload;
          next();
        },
      );
    },
  );
};

export default auth;
