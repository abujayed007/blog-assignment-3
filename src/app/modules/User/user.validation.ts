import { z } from 'zod';

const registerUserValidation = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

const updateUserValidation = z.object({
  isBlocked: z.string().optional(),
});

export const userValidationSchema = {
  registerUserValidation,
  updateUserValidation,
};
