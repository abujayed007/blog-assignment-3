import { z } from 'zod';

const registerUserValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z
      .enum(['admin', 'user'], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be either "admin" or "user"',
      })
      .optional(),
  }),
});

const updateUserValidation = z.object({
  isBlocked: z.string().optional(),
});

export const userValidationSchema = {
  registerUserValidation,
  updateUserValidation,
};
