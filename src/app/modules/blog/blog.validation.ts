import { Types } from 'mongoose';
import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Author must be a valid ObjectId',
    }),
    isPublished: z.boolean().optional(),
  }),
});

const updateBlogValidationSchems = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchems,
};
