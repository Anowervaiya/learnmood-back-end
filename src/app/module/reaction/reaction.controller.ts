

import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';


import { sendResponse } from '../../utils/sendResponse';


import type { JwtPayload } from 'jsonwebtoken';
import type { IReact } from './reaction.interface';
import { ReactServices } from './reaction.service';

const createReact = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload
  const payload = {
    user: user.userId,
    ...req.body,
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
const getMyReact = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  
  const result = await ReactServices.getMyReact(query);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: ' My React  retrieved successfully',
    data: result,
 
  });
});

const updateReact = catchAsync(async (req: Request, res: Response) => {

  const payload: IReact = {
    ...req.body,
  };
  const result = await ReactServices.updateReact(
    req.params.id as string,
    payload
  );
  

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'React is updated successfully',
    data: result
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
  getMyReact

};
