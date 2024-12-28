import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),

  BlogController.createBlog,
);
router.patch('/:id', auth(USER_ROLE.user), BlogController.updateBlog);
router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);

router.get('/', BlogController.getAllBlogs);

export const BlogRoute = router;
