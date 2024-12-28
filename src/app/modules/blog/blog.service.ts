import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (payload: Record<string, unknown>) => {
  // console.log(payload);
  const payloadObj = { ...payload };
  const blogSearchableFields = ['title', 'content'];
  let searchTerm = '';

  if (payload?.searchTerm) {
    searchTerm = payload.searchTerm as string;
  }
  const searchQuery = Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeField = ['searchTerm', 'sort'];
  excludeField.forEach((elem) => delete payloadObj[elem]);

  // console.log({ payload, payloadObj });
  const filterQuery = searchQuery.find(payloadObj);

  let sort = '-createdAt';
  if (payload.sort) {
    sort = payload.sort as string;
  }

  const sortQuery = await filterQuery.sort(sort);
  return sortQuery;
};

const updateBlogIntoDB = async (id: string, payload: TBlog) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const adminDeleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  adminDeleteBlogFromDB,
};
