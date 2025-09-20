import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

import httpStatus from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { IUser } from './user.interfaces';
import AppError from '../../errorHelpers/appError';
import type { Types } from 'mongoose';
import type { FRIEND_REQUEST_STATUS } from './user.constant';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const payload: IUser = {
      ...req.body,
      image: {
        profile: files?.profile?.[0]?.path || null, // Cloudinary URL
        banner: files?.banner?.[0]?.path || null, // Cloudinary URL
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
    const query = req.query as Record<string, string>;
    const result = await UserServices.getAllUsers(query);

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
const getRecommendedUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const result = await UserServices.getRecommendedUsers(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Recommended User Retrieved Successfully',
      data: result.data,
    });
  }
);
const getMyFriends = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const result = await UserServices.getMyFriends(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'My friends Retrieved Successfully',
      data: result.data,
    });
  }
);
const sendFriendRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId: myId } = req.user as JwtPayload;
    const { id: recipientId } = req.params;
    if (myId === recipientId) {
      throw new AppError(400, "You can't send friend request to yourself");
    }

    const payload = { myId, recipientId };

    const result = await UserServices.sendFriendRequest(
      payload as unknown as {
        myId: Types.ObjectId;
        recipientId: Types.ObjectId;
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Send Friend Reqeust Successful',
      data: result.data,
    });
  }
);
const changeStatusOfFreindRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId: myId } = req.user as JwtPayload;
    const { id: requestId } = req.params;
    const { status } = req.body;

    const payload = { myId, requestId, status };
    await UserServices.changeStatusOfFreindRequest(
      payload as {
        myId: string;
        requestId: string;
        status: FRIEND_REQUEST_STATUS;
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Friend request status change',
      data: null,
    });
  }
);
const getFriendRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const result = await UserServices.getFriendRequests(userId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Friend request retrieved successfully',
      data: result.data,
    });
  }
);
const getOutgoingFriendRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const result = await UserServices.getOutgoingFriendRequest(
      userId as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Outgoing Friend Request retrieved successfully',
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
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  changeStatusOfFreindRequest,
  getFriendRequests,
  getOutgoingFriendRequest,
};
