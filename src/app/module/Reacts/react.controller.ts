

import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';


import { sendResponse } from '../../utils/sendResponse';


import type { JwtPayload } from 'jsonwebtoken';
import type { IReact } from './react.interface';
import { ReactServices } from './react.service';

const createReact = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload
  const payload = {
    user: user.userId,
    ...req.body,
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
 
  const result : any = await ReactServices.createReact(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'React created successfully',
    data: result,
  });
});
const getAllReact = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await ReactServices.getAllReact(query);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: ' All React  retrieved successfully',
    data: result.data,
    meta: result.meta
  });
});

const updateReact = catchAsync(async (req: Request, res: Response) => {

  const payload: IReact = {
    ...req.body,
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
  const result = await ReactServices.updateReact(
    req.params.id as string,
    payload
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'React is updated successfully',
    data: result,
  });
});

const deleteReact = catchAsync(async (req: Request, res: Response) => {
  const { id} = req.params ;
  const result = await ReactServices.deleteReact(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'React is deleted successfully',
    data: result,
  });
});



export const ReactController = {
  createReact,
  deleteReact,
  updateReact,
  getAllReact,

};
