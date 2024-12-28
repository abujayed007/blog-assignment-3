import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { BlogController } from '../blog/blog.controller';

const router = Router();

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  BlogController.adminDeleteBlog,
);
export const AdminRoute = router;
