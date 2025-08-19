import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PostServices } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";


const createPost = catchAsync(async (req: Request, res: Response) => {




  const payload = {
    ...req.user,
    ...req.body
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
  const result = await PostServices.createPost(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

export const PostController = {
  createPost,
};
