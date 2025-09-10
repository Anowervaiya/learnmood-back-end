import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';


import { sendResponse } from '../../utils/sendResponse';

import { CommentServices } from './comment.service';
import type { IComments } from './comment.interface';
import type { JwtPayload } from 'jsonwebtoken';

const createcomment = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload
  const payload : IComments = {
    user: user.userId,
    ...req.body,
    media: (req.files as Express.Multer.File[])?.map(file => ({
      url: file.path, // make url an array
      type: 'image',
    })),
  };
 
  const result = await CommentServices.createComment(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'comment created successfully',
    data: result,
  });
});

const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await CommentServices.getAllComments(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Comment retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const payload: IComments = {
    ...req.body,
    media: (req.files as Express.Multer.File[])?.map(file => ({
      url: file.path, // make url an array
      type: 'image',
    })),
  };
  const result = await CommentServices.updateComment(id,payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'comment is updated successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id} = req.params ;
  const result = await CommentServices.deleteComment(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'comment is deleted successfully',
    data: result,
  });
});

export const commentController = {
  createcomment,
  deleteComment,
  updateComment,
  getAllComments,
};
