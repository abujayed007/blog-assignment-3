/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthenticatedRequest } from '../../middleware/auth';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req: AuthenticatedRequest, res) => {
  const result = await BlogService.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: AuthenticatedRequest, res) => {
  console.log('user', req.user);
  const result = await BlogService.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrived successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const result = await BlogService.updateBlogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
    data: null,
  });
});

const adminDeleteBlog = catchAsync(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const result = await BlogService.adminDeleteBlogFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
    data: null,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  adminDeleteBlog,
};
