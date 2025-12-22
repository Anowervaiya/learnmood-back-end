import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PostServices } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import type {  IPost } from "./post.interface";
import { IDecodedPayload } from "../../interfaces/global.interfaces";


const createPost = catchAsync(async (req: Request, res: Response) => {

  const decodedToken = req.user as IDecodedPayload;

  const payload: IPost = {
    accountId: decodedToken?.accountId,
    accountType: decodedToken?.accountType,
    ...req.body,
    media: (req.files as Express.Multer.File[])?.map(file => ({
      url: file.path, // make url an array
      type: 'image',
    })),
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
  const query = req.query as Record<string, string>;
 
  const result = await PostServices.getAllPosts(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Posts retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getPostDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PostServices.getPostDetails(id as string );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post Details retrieved successfully',
    data: result,
  });
});
const updatePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const payload: IPost = {
    ...req.body,
    media: (req.files as Express.Multer.File[])?.map(file => ({
      url: file.path, // make url an array
      type: 'image',
    })),
  };
  const result = await PostServices.updatePost(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'post is updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const { id} = req.params ;
   await PostServices.deletePost(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post is deleted successfully',
    data: null,
  });
});


export const PostController = {
  createPost,
  getAllPosts,
  getPostDetails,
  deletePost,
  updatePost,
};
