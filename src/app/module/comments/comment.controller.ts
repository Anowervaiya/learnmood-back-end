import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';


import { sendResponse } from '../../utils/sendResponse';

import { CommentServices } from './comment.service';

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

export const commentController = {
  createcomment,
};
