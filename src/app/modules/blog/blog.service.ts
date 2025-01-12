import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogsSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

const getAllBlogsFromDB = async (payload: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', 'name email'),
    payload,
  )
    .search(blogsSearchableFields)
    .authorFiltering()
    .filter()
    .sortBy()
    .sortOrder();
  const blogs = await blogQuery.modelQuery;
  return blogs;
};

const updateBlogIntoDB = async (id: string, payload: TBlog) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author');
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const adminDeleteBlogFromDB = async (id: string, author: JwtPayload) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  if (author?.role !== 'admin') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }
  await Blog.findByIdAndDelete(id);
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  adminDeleteBlogFromDB,
};
