import type { JwtPayload } from 'jsonwebtoken';

import type { Types } from 'mongoose';
import type { Role } from '../user/user.interfaces';
import AppError from '../../errorHelpers/appError';
import httpStatus from 'http-status-codes';
import { Story } from './story.model';
import type { IStory } from './story.interface';

const createStory = async (payload: IStory) => {


  return await Story.create({
    ...payload,
  });

 
};

const getAllStories = async () => {

  const AllStory = await Story.find()
  const totalStoryCount = await Story.countDocuments()
   if (totalStoryCount === 0) {
     throw new AppError(401, 'Story not available');
   }
  
  return {
    data: AllStory,
    meta: {
      total: totalStoryCount,
    },
  };
};
const updateStory = async (id: string, payload: Partial<IStory>) => {
  const isStoryExist = await Story.findById(id);

  if (!isStoryExist) {
    throw new Error('Story does not exist.');
  }

  const updatedStory = await Story.findByIdAndUpdate(id, payload, { new: true });

  return updatedStory;
};
const deleteStory = async (id: string) => {
  const isExistStory = await Story.findById(id);
  if (!isExistStory) {
    throw new AppError(httpStatus.BAD_REQUEST, "Story doesn't exist");
  }

  return await Story.findByIdAndDelete(id);
};

export const StoryServices = {
  createStory,
  getAllStories,
  deleteStory,
  updateStory,
};
