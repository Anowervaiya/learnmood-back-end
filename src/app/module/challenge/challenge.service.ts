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
import { Participant } from '../participant/participant.model';
import { EntityType } from '../../constant/constant';
import { Follow } from '../follow/follow.model';
import { Booking } from '../booking/booking.model';
import { BOOKING_STATUS, IBooking } from '../booking/booking.interface';

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

export const getAllChallenges = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Challenge.find(), query)
    .search(ChallengeSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .populate('createdBy', 'name image');

  const [challenges, meta] = await Promise.all([
    queryBuilder.build(),
    queryBuilder.getMeta(),
  ]);

  const challengeIds = challenges.map((ch: any) => ch._id);

  // ✅ Count how many users participated in each challenge
  const participantCounts = await Participant.aggregate([
    {
      $match: {
        entityId: { $in: challengeIds },
        entityType: EntityType.Challenge,
      },
    },
    {
      $group: {
        _id: '$entityId',
        uniqueUsers: { $addToSet: '$user' }, // ensure no duplicates
      },
    },
    {
      $project: {
        _id: 1,
        count: { $size: '$uniqueUsers' }, // count unique users
      },
    },
  ]);

  // Create a map for quick access
  const countMap: Record<string, number> = {};
  participantCounts.forEach(p => {
    countMap[p._id.toString()] = p.count;
  });

  // ✅ Attach participantCount to each challenge
  const mergedData = challenges.map((challenge: any) => ({
    ...challenge.toObject(),
    participantCount: countMap[challenge._id.toString()] || 0,
  }));

  return { data: mergedData, meta };
};

export const getMyPurchasedChallenges = async (
  accountId: string,
  query: Record<string, string>
) => {

  // Base filter for purchased challenges
  const baseFilter = {
    accountId,
    entityType: EntityType.Challenge,
    status: BOOKING_STATUS.COMPLETE,  // only successful payments
  };

  // QueryBuilder expects query object, so merge baseFilter → query
  const finalQuery = { ...query, ...baseFilter };

  const queryBuilder = new QueryBuilder(Booking.find(), finalQuery)
    .search(ChallengeSearchableFields)     // search Title, Category, Level etc.
    .filter()                               // apply filters (with baseFilter merged)
    .sort()                                 // sorting
    .fields()                               // selected fields
    .paginate()                             // page, limit
    .populate("entityId")                   // fetch challenge data
    .populate("accountId", "name image");   // fetch user info (optional)

  const [bookings, meta] = await Promise.all([
    queryBuilder.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data : bookings.map(booking => booking?.entityId),
    meta,
  };
};

const getChallengeDetails = async (id: string , userId: string) => {
   
  const challenge = await Challenge.findById(id).populate('createdBy', 'name image followersCount');
  if (!challenge) {
    throw new AppError(400,'Challenge is not found')
  }

  const followCheck = await Follow.findOne({
    "follower.id": userId,
    "following.id": challenge.createdBy
  });

  const isFollowing = !!followCheck;

  const days = await ChallengeDay.find({ challengeId: challenge._id })
 
 
  
  return {
    challenge,
    days,
     isFollowing
  }

  
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
  updateChallenge,getChallengeDetails,getMyPurchasedChallenges
};
