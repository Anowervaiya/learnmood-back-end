import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';


import { sendResponse } from '../../utils/sendResponse';

import { CommentServices } from './comment.service';
import type { IComments } from './comment.interface';

const createcomment = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.user,
    ...req.body,
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
  const result = await CommentServices.createComment(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'comment created successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {

  const payload: IComments = {
    ...req.body,
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
  const result = await CommentServices.updateComment(
    req.params.id as string,
    payload
  );

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
};
