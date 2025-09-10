import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

import httpStatus from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { ServiceServices } from './service.service';
import type { IService } from './service.interfaces';

const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const payload = {
      user: decodedToken?.userId,
      ...req.body,
      media: (req.files as Express.Multer.File[])?.map(file => ({
        url: file.path, // make url an array
        type: 'image',
      })),
    };

    const Service = await ServiceServices.createService(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Service Created Successfully',
      data: Service,
    });
  }
);

const updateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    
    const payload: IService = {
      ...req.body,
      media: (req.files as Express.Multer.File[])?.map(file => ({
        url: file.path, // make url an array
        type: 'image',
      })),
    };

    const Service = await ServiceServices.updateService(id, payload);

    // res.status(httpStatus.CREATED).json({
    //     message: "Service Created Successfully",
    //     Service
    // })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Service Updated Successfully',
      data: Service,
    });
  }
);

const deleteService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id as string;

    const result = await ServiceServices.deleteService(Id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Service  is deleted Successfully',
      data: result,
    });
  }
);


const getAllService = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await ServiceServices.getAllService(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Service retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await ServiceServices.getSingleService(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Service Retrieved Successfully',
      data: result.data,
    });
  }
);
export const ServiceControllers = {
  createService,
  getAllService,
  updateService,
  deleteService,
  getSingleService,
};
