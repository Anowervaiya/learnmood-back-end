import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { StoryServices } from './story.service';
import { sendResponse } from '../../utils/sendResponse';
import type { IMedia, IStory } from './story.interface';
import type { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/appError';

const createStory = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const payload: IStory = {
    user: decodedToken?.userId,
    ...req.body,
    media: {
      url: req.file?.path as string,
      type: 'image',
    },
  };
  const result = await StoryServices.createStory(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Story is created successfully',
    data: result,
  });
});

const getAllStories = catchAsync(async (req: Request, res: Response) => {
  // const query = req.query;
  const result = await StoryServices.getAllStories();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Story retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const updateStory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const payload: IStory = {
    ...req.body,
    media: {
      url: req.file?.path as string,
      type: 'image',
    },
  };
  const result = await StoryServices.updateStory(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Story is updated successfully',
    data: result,
  });
});

const deleteStory = catchAsync(async (req: Request, res: Response) => {
  const  id  = req.params.id as string;
  const result = await StoryServices.deleteStory(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Story is deleted successfully',
    data: result,
  });
});

export const StoryController = {
  createStory,
  getAllStories,
  deleteStory,
  updateStory,
};
