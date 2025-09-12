import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import type { JwtPayload } from 'jsonwebtoken';
import type { IMessages } from './message.interface';
import { MessageServices } from './message.service';

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { id: receiverId } = req.params;
  const user = req.user as JwtPayload
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


const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await MessageServices.getAllMessages(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Message retrieved successfully',
    data: result.data,
    meta: result.meta,
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
  const result = await MessageServices.updateMessage(id,payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message is updated successfully',
    data: result,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const { id} = req.params ;
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
  getAllMessages,
};
