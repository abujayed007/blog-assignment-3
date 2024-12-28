import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidationSchema } from './user.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidationSchema.registerUserValidation),
  UserController.registerUser,
);

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  validateRequest(userValidationSchema.updateUserValidation),
  UserController.updateUserIsBlocked,
);

export const UserRoutes = router;
