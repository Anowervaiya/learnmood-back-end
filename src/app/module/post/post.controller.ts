import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PostServices } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import type { IMedia, IPost } from "./post.interface";
import type { JwtPayload } from "jsonwebtoken";


const createPost = catchAsync(async (req: Request, res: Response) => {

  const decodedToken = req.user as JwtPayload;

  const payload: IPost = {
    user: decodedToken?.userId,
    ...req.body,
    media: { url: (req.files as Express.Multer.File[])?.map(file => file.path) , type: "image"},
  };
  const result = await PostServices.createPost(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Post is created successfully',
    data:result
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  // const query = req.query;
  // const result = await PostServices.getAllPosts(query as Record<string, string>);
  // sendResponse(res, {
  //   statusCode: 200,
  //   success: true,
  //   message: 'Tours retrieved successfully',
  //   data: result.data,
  //   meta: result.meta,
  // });
});
const updatePost = catchAsync(async (req: Request, res: Response) => {
  const payload: IPost = {
    ...req.body,
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
  const result = await PostServices.updatePost(req.params.id as string, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'post is updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const { id} = req.params ;
  const result = await PostServices.deletePost(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post is deleted successfully',
    data: result,
  });
});


export const PostController = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
};
