import { catchAsync } from '../../utils/catchAsync';
import { BloodServices } from './blood.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { IBloodDonor, IBloodRequest } from './blood.interfaces';

const createBloodDonor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
 
    const user = req.user as JwtPayload;

    const payload: IBloodDonor = {
      ...req.body,
      user: user?.userId,
     
    };

    const BloodDonor = await BloodServices.createBloodDonor(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'BloodDonor Created Successfully',
      data: BloodDonor,
    });
  }
);
const createBloodRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const payload : IBloodRequest = {
      requestedBy: user?.userId,
      ...req.body
    }
    const BloodRequest = await BloodServices.createBloodRequest(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'BloodDonor Member Created Successfully',
      data: BloodRequest,
    });
  }
);

const updateBloodDonor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
 
    const payload: IBloodDonor = {
      ...req.body,
      
    };
    const BloodDonor = await BloodServices.updateBloodDonor(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'BloodDonor Updated Successfully',
      data: BloodDonor,
    });
  }
);

const deleteBloodDonor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id as string;

    const result = await BloodServices.deleteBloodDonor(Id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'BloodDonor  is deleted Successfully',
      data: result,
    });
  }
);
const deleteBloodRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id as string;

    const result = await BloodServices.deleteBloodRequest(Id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'BloodDonor  member is deleted Successfully',
      data: result,
    });
  }
);

const getAllBloodDonors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as Record<string, string>;
    const result = await BloodServices.getAllBloodDonors(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'All BloodDonors Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getAllBloodRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as Record<string, string>;
    const result = await BloodServices.getAllBloodRequests(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'All BloodDonor Members Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);



export const BloodControllers = {
  createBloodDonor,
  getAllBloodDonors,
  deleteBloodDonor,
  updateBloodDonor,
  createBloodRequest,
  getAllBloodRequests,
  deleteBloodRequest
};
