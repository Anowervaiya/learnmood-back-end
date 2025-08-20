import type { JwtPayload } from "jsonwebtoken";
import type { IPost, VISIBILITY } from "./post.interface";
import { Post } from "./post.model";
import type { Types } from "mongoose";
import type { Role } from "../user/user.interfaces";
import AppError from "../../errorHelpers/appError";
import httpStatus from 'http-status-codes'


const createPost = async (payload: IPost) => {

  const post = await Post.create({
    ...payload
  })

  return post;

  }

const getAllPosts = async (query: Record<string, string>) => {
  // const queryBuilder = new QueryBuilder(Tour.find(), query);

  // const tours = await queryBuilder
  //   .search(tourSearchableFields)
  //   .filter()
  //   .sort()
  //   .fields()
  //   .paginate();

  // // const meta = await queryBuilder.getMeta()

  // const [data, meta] = await Promise.all([
  //   tours.build(),
  //   queryBuilder.getMeta(),
  // ]);

  // return {
  //   data,
  //   meta,
  // };
};
const updatePost = async (id: string, payload: Partial<IPost>) => {
  const isPostExist = await Post.findById(id);

  if (!isPostExist) {
    throw new Error('Post does not exist.');
  }


  // if (
  //   payload.images &&
  //   payload.images.length > 0 &&
  //   existingTour.images &&
  //   existingTour.images.length > 0
  // ) {
  //   payload.images = [...payload.images, ...existingTour.images];
  // }

  // if (
  //   payload.deleteImages &&
  //   payload.deleteImages.length > 0 &&
  //   existingTour.images &&
  //   existingTour.images.length > 0
  // ) {
  //   const restDBImages = existingTour.images.filter(
  //     imageUrl => !payload.deleteImages?.includes(imageUrl)
  //   );

  //   const updatedPayloadImages = (payload.images || [])
  //     .filter(imageUrl => !payload.deleteImages?.includes(imageUrl))
  //     .filter(imageUrl => !restDBImages.includes(imageUrl));

  //   payload.images = [...restDBImages, ...updatedPayloadImages];
  // }

  const updatedPost = await Post.findByIdAndUpdate(id, payload, { new: true });

  // if (
  //   payload.deleteImages &&
  //   payload.deleteImages.length > 0 &&
  //   existingTour.images &&
  //   existingTour.images.length > 0
  // ) {
  //   await Promise.all(
  //     payload.deleteImages.map(url => deleteImageFromCLoudinary(url))
  //   );
  // }

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
