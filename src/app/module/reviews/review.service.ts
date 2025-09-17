import httpStatus from 'http-status-codes';
import { QueryBuilder } from '../../utils/QueryBuilder';
import type { IReview } from './review.interface';
import { Review } from './review.modal';
import AppError from '../../errorHelpers/appError';
const createReview = async (payload: IReview) => {

 return await Review.create(payload);

 
};
const getAllReview= async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Review.find(), query);

  const ReviewData = queryBuilder
    // .search(ReviewSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    ReviewData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateReview = async (id: string, payload: Partial<IReview>) => {
  const isReviewExist = await Review.findById(id);

  if (!isReviewExist) {
    throw new Error('Review does not exist.');
  }

  const updatedReview = await Review.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedReview;
};

const deleteReview = async (id: string) => {
  const isReviewExist = await Review.findById(id);
  if (!isReviewExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Review doesn't exist");
  }

  return await Review.findByIdAndDelete(id);
};

export const ReviewServices = {
  createReview,
  updateReview,
  deleteReview,
  getAllReview,
 
};
