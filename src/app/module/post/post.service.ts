import type { JwtPayload } from "jsonwebtoken";
import type { IPost } from "./post.interface";
import { Post } from "./post.model";
import httpStatus from 'http-status-codes'
import AppError from "../../errorHelpers/appError";
import type { IMedia } from "../../interfaces/global.interfaces";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { extractKeywordsAdvanced } from "../../utils/keyWordGenerator";


const createPost = async (payload: IPost) => {

   const {  content, ...rest } = payload;

  const tag = extractKeywordsAdvanced(content);



  
 const post = await Post.create({ content,  tag , ...rest });

  return post;

  }

const getAllPosts = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Post.find(), query);

  const posts = queryBuilder
    // .search(postSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .populate('user', 'name image');
  
  const [data, meta] = await Promise.all([
    posts.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};
const updatePost = async (id: string, payload: IPost) => {
  const isPostExist = await Post.findById(id);

  if (!isPostExist) {
    throw new Error('Post does not exist.');
  }

  const updatedPost = await Post.findByIdAndUpdate(id, payload, { new: true });

  if (payload.media && isPostExist.media) {
    await Promise.all(
      isPostExist.media.map((media: IMedia) => deleteImageFromCLoudinary(media.url))
    );
  }

  return updatedPost;
};
const deletePost = async (id: string) => {

  const post = await Post.findById(id);
  if (!post) {
    throw new AppError(httpStatus.BAD_REQUEST, "post doesn't exist")
  }

  return await Post.findByIdAndDelete(id);
};

export const PostServices = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
};
