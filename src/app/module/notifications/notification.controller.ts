import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import type { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";
import { NotificationService } from "./notification.service";

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await NotificationService.getNotifications(user.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Notification retrieved successfully',
    data: result.data,
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { notificationId } = req.params;

  const result = await NotificationService.markAsRead(notificationId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mark As Read successfully',
    data: result.data,
  });
});


export const NotificationController = { getNotifications, markAsRead };