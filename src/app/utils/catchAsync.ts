import { NextFunction, RequestHandler, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

const catchAsync = (fn: RequestHandler) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
