import type { IMentor } from './mentor.interface';
import { Mentor } from './mentor.model';
import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/appError';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { MentorSearchableFields } from './mentor.constant';
import { User } from '../user/user.model';
import { Booking } from '../booking/booking.model';
import { BOOKING_STATUS, IBooking } from '../booking/booking.interface';
import { EntityType } from '../../constant/constant';

const createMentor = async (data: IMentor) => {
  const existing = await Mentor.findOne({ userId: data.userId })
  const user = await User.findOne({_id : data.userId })
  if (existing) {
    throw new AppError(400, 'You already applied as a tutor');
  }
  
  const payload = {
    ...data,
    userName : user?.name
  }

  return await Mentor.create(payload);
};

const getAllMentors = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Mentor.find(), query);

  const Mentors = queryBuilder
    .search(MentorSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .populate('userId', 'name image');

  const [data, meta] = await Promise.all([
    Mentors.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

export const getMyPurchasedMentors = async (
  accountId: string,
  query: Record<string, string>
) => {


  // Base filter for purchased mentors
  const baseFilter = {
    accountId,
    entityType: EntityType.Mentor,
    status: BOOKING_STATUS.COMPLETE,  // only successful payments
  };


  // QueryBuilder expects query object, so merge baseFilter → query
  const finalQuery = { ...query, ...baseFilter };

  const queryBuilder = new QueryBuilder(Booking.find(), finalQuery)
    // .search(ChallengeSearchableFields)     // search Title, Category, Level etc.
    .filter()                               // apply filters (with baseFilter merged)
    .sort()                                 // sorting
    .fields()                               // selected fields
    .paginate()                             // page, limit
    .populate({
    path: "entityId",       // ১ম populate → mentor
    populate: {
      path: "userId",       // ২য় populate → mentor.userId
      select: "name image"
    }
  })// fetch user info (optional)

  const [bookings, meta] = await Promise.all([
    queryBuilder.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data : bookings.map(booking => booking?.entityId) ,
    meta,
  };
};


const updateMentor = async (id: string, payload: IMentor) => {
  const isMentorExist = await Mentor.findById(id);
  if (!isMentorExist) {
    throw new Error('Mentor does not exist.');
  }
  return await Mentor.findByIdAndUpdate(id, payload, { new: true });
};

const deleteMentor = async (id: string) => {
  const mentor = await Mentor.findById(id);
  if (!mentor) {
    throw new AppError(httpStatus.BAD_REQUEST, "Mentor doesn't exist");
  }

  return await Mentor.findByIdAndDelete(id);
};

export const MentorServices = {
  createMentor,
  getAllMentors,
  deleteMentor,
  updateMentor,

  getMyPurchasedMentors
};
