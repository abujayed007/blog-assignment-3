/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
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
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: result.author,
    },
  });
});

const getAllBlogs = catchAsync(async (req: AuthenticatedRequest, res) => {
  // console.log('user', req.user);
  const result = await BlogService.getAllBlogsFromDB(req.query);
  const resultToSend = result.map((blog) => ({
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
  }));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: resultToSend,
  });
});

const updateBlog = catchAsync(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const result = await BlogService.updateBlogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});

const deleteBlog = catchAsync(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

const adminDeleteBlog = catchAsync(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await BlogService.adminDeleteBlogFromDB(id, user);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  adminDeleteBlog,
};
