import type { IMentor } from './mentor.interface';
import { Mentor } from './mentor.model';
import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/appError';
import { QueryBuilder } from '../../utils/QueryBuilder';

const createMentor = async (payload: IMentor) => {
  const existing = await Mentor.findOne({ userId: payload.userId });
  if (existing) {
    throw new AppError(400, 'You already applied as a mentor');
  }

  return await Mentor.create(payload);
};

const getAllMentors = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Mentor.find(), query);

  const Mentors = queryBuilder
    // .search(MentorSearchableFields)
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
};
