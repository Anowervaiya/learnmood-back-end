import type { JwtPayload } from 'jsonwebtoken';

import type { Types } from 'mongoose';
import AppError from '../../errorHelpers/appError';
import httpStatus from 'http-status-codes';
import { Challenge } from './challenge.model';
import type { IChallenge } from './challenge.interface';

const createChallenge = async (payload: IChallenge) => {
  return await Challenge.create(payload);
};

const getAllChallenges = async (query: Record<string, string>) => {
  // const queryBuilder = new QueryBuilder(Tour.find(), query);
  // const tours = await queryBuilder
  //   .search(tourSearchableFields)
  //   .filter()
  //   .sort()
  //   .fields()
  //   .paginate();
  // // const meta = await queryBuilder.getMeta()
  // const [data, meta] = await Promise.all([
  //   tours.build(),
  //   queryBuilder.getMeta(),
  // ]);
  // return {
  //   data,
  //   meta,
  // };
};
const updateChallenge = async (id: string, payload: Partial<IChallenge>) => {
  const isChallengeExist = await Challenge.findById(id);

  if (!isChallengeExist) {
    throw new Error('Challenge does not exist.');
  }

  // if (
  //   payload.images &&
  //   payload.images.length > 0 &&
  //   existingTour.images &&
  //   existingTour.images.length > 0
  // ) {
  //   payload.images = [...payload.images, ...existingTour.images];
  // }

  // if (
  //   payload.deleteImages &&
  //   payload.deleteImages.length > 0 &&
  //   existingTour.images &&
  //   existingTour.images.length > 0
  // ) {
  //   const restDBImages = existingTour.images.filter(
  //     imageUrl => !payload.deleteImages?.includes(imageUrl)
  //   );

  //   const updatedPayloadImages = (payload.images || [])
  //     .filter(imageUrl => !payload.deleteImages?.includes(imageUrl))
  //     .filter(imageUrl => !restDBImages.includes(imageUrl));

  //   payload.images = [...restDBImages, ...updatedPayloadImages];
  // }

  const updatedChallenge = await Challenge.findByIdAndUpdate(id, payload, {
    new: true,
  });

  // if (
  //   payload.deleteImages &&
  //   payload.deleteImages.length > 0 &&
  //   existingTour.images &&
  //   existingTour.images.length > 0
  // ) {
  //   await Promise.all(
  //     payload.deleteImages.map(url => deleteImageFromCLoudinary(url))
  //   );
  // }

  return updatedChallenge;
};
const deleteChallenge = async (id: string) => {
  const isChallengeExist = await Challenge.findById(id);
  if (!isChallengeExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Challenge doesn't exist");
  }

  return await Challenge.findByIdAndDelete(id);
};

export const ChallengeServices = {
  createChallenge,
  getAllChallenges,
  deleteChallenge,
  updateChallenge,
};
