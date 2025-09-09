import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

import httpStatus from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { IUser } from './user.interfaces';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const payload: IUser = {
      ...req.body,
      image: {
        profile: files?.profile?.[0]?.path, // Cloudinary URL
        banner: files?.banner?.[0]?.path, // Cloudinary URL
      },
    };

    const user = await UserServices.createUser(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User Created Successfully',
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const payload = {
      ...req.body,
      image: {
        profile: files?.profile?.[0]?.path, // Cloudinary URL
        banner: files?.banner?.[0]?.path, // Cloudinary URL
      },
    };
    const user = await UserServices.updateUser(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User Updated Successfully',
      data: user,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id as string;

    await UserServices.deleteUser(Id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User  is deleted Successfully',
      data: null,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'All Users Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);
const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserServices.getMe(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Your profile Retrieved Successfully',
      data: result.data,
    });
  }
);
const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await UserServices.getSingleUser(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User Retrieved Successfully',
      data: result.data,
    });
  }
);
export const UserControllers = {
  createUser,
  getAllUsers,
  getMe,
  updateUser,
  deleteUser,
  getSingleUser,
};
