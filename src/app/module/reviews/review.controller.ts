import type { Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../../utils/catchAsync';
import { ReviewServices } from './review.service';
import { sendResponse } from '../../utils/sendResponse';
import type { IReview } from './review.interface';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload
  const payload = {
    user: user.userId,
    ...req.body,
  };
 
  const result  = await ReviewServices.createReview(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});


const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await ReviewServices.getAllReview(query);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: ' All Review  retrieved successfully',
    data: result.data,
    meta: result.meta
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {

  const payload: IReview = {
    ...req.body,
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
  const result = await ReviewServices.updateReview(
    req.params.id as string,
    payload
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review is updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id} = req.params ;
  const result = await ReviewServices.deleteReview(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review is deleted successfully',
    data: result,
  });
});



export const ReviewController = {
  createReview,
  deleteReview,
  updateReview,
  getAllReview,

};
