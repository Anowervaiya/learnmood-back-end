import type { JwtPayload } from 'jsonwebtoken';

import type { Types } from 'mongoose';
import AppError from '../../errorHelpers/appError';
import httpStatus from 'http-status-codes';
import { Challenge, ChallengeDay } from './challenge.model';
import type { IChallenge, IChallengeDay } from './challenge.interface';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import type { IMedia } from '../../interfaces/global.interfaces';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { userSearchableFields } from '../user/user.constant';
import { ChallengeSearchableFields } from './challenge.contant';

const createChallenge = async (payload: IChallenge) => {
  return await Challenge.create(payload);
};
const createChallengeDay = async (payload: IChallengeDay) => {
  const isExistChallenge = await Challenge.findById(payload.challengeId);

  if (!isExistChallenge) {
    throw new AppError(400, "you don't have a challenge then how you want to create a ")
  }

  const result = await ChallengeDay.create({
    ...payload,
    challengeId: isExistChallenge._id,
  });
  return result;

 
};

const getAllChallenges = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Challenge.find(), query)
    
    const challengeData = queryBuilder
          .search(ChallengeSearchableFields)
          .filter()
          .sort()
          .fields()
          .paginate()
    
      const [data, meta] = await Promise.all([
        challengeData.build(),
        queryBuilder.getMeta(),
      ]);
  
      return {
        data,
        meta,
      };
  
};
const updateChallenge = async (id: string, payload: Partial<IChallenge>) => {
  const isChallengeExist = await Challenge.findById({ _id: id });

  if (!isChallengeExist) {
    throw new Error('Challenge does not exist.');
  }

 
  const updatedChallenge = await Challenge.findByIdAndUpdate(id, payload, {
    new: true,
  });

  // if (payload.media && isChallengeExist.media) {
  //   await Promise.all(
  //     isChallengeExist.media.map((media: IMedia)  => deleteImageFromCLoudinary(media.url))
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
  createChallenge,createChallengeDay,
  getAllChallenges,
  deleteChallenge,
  updateChallenge,
};
