import AppError from '../../errorHelpers/appError';
import httpStatus from 'http-status-codes';
import { Story } from './story.model';
import type { IStory } from './story.interface';
import type { IMedia } from '../../interfaces/global.interfaces';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import { QueryBuilder } from '../../utils/QueryBuilder';

const createStory = async (payload: IStory) => {

  return await Story.create(payload);
};

const getAllStories = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Story.find(), query);

  const Stories = queryBuilder
    // .search(StorieSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();



  const [data, meta] = await Promise.all([
    Stories.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};
const updateStory = async (id: string, payload: Partial<IStory>) => {
  const isStoryExist = await Story.findById({_id: id});

  if (!isStoryExist) {
    throw new Error('Story does not exist.');
  }

  const updatedStory = await Story.findByIdAndUpdate(id, payload, {
    new: true,
  });

   
     if (payload.media && isStoryExist.media) {
       await Promise.all(
         isStoryExist.media.map((media: IMedia) =>
           deleteImageFromCLoudinary(media.url)
         )
       );
     }

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
