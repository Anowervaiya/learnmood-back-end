import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import type { JwtPayload } from 'jsonwebtoken';
import type { IMessages, IPayloadGetMessage } from './message.interface';
import { MessageServices } from './message.service';

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { id: receiverId } = req.params;
  const user = req.user as JwtPayload;
  const payload: IMessages = {
    senderId: user.userId,
    receiverId,
    ...req.body,
    media: (req.files as Express.Multer.File[])?.map(file => ({
      url: file.path, // make url an array
      type: 'image',
    })),
  };

  const result = await MessageServices.sendMessage(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message sent successfully',
    data: result,
  });
});

const getSidebarUsers = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await MessageServices.getSidebarUsers(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sidebar User retrieved successfully',
    data: result.data,
  });
});

const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { id: userToChatId } = req.params;

  const userId = (req.user as JwtPayload).userId;

  const payload = { userToChatId, userId } as IPayloadGetMessage;

  const result = await MessageServices.getMessages(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Message retrieved successfully',
    data: result.data,
  });
});

const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const payload: IMessages = {
    ...req.body,
    media: (req.files as Express.Multer.File[])?.map(file => ({
      url: file.path, // make url an array
      type: 'image',
    })),
  };
  const result = await MessageServices.updateMessage(id, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message is updated successfully',
    data: result,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MessageServices.deleteMessage(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message is deleted successfully',
    data: result,
  });
});

export const MessageController = {
  sendMessage,
  deleteMessage,
  updateMessage,
  getMessages,
  getSidebarUsers,
};
