import type { JwtPayload } from 'jsonwebtoken';

import type { Types } from 'mongoose';
import { Comment } from './comment.model';
import AppError from '../../errorHelpers/appError';
import { Post } from '../post/post.model';
import type { IComments } from './comment.interface';
import httpStatus from 'http-status-codes';
import type { Role } from '../user/user.constant';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import type { IMedia } from '../../interfaces/global.interfaces';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { CommentSearchableFields } from './comment.constant';


const createComment = async (payload: IComments) => {
  
 return await Comment.create(payload);

};

const getAllComments = async (query: Record<string, string>) => {
  
  const queryBuilder = new QueryBuilder(Comment.find(), query);

  const commentData = queryBuilder
    .filter()
    .paginate()
    .populate('user', 'name image')
    .populate('entityId', 'content');
  

  const [data, meta] = await Promise.all([
    commentData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateComment = async (id: string, payload: Partial<IComments>) => {
  const isCommentExist = await Comment.findById({_id: id});

  if (!isCommentExist) {
    throw new Error('Comment does not exist.');
  }

  const updatedComment = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (payload.media && isCommentExist.media) {
      await Promise.all(
        isCommentExist.media.map((media: IMedia) => deleteImageFromCLoudinary(media.url))
      );
    }


  return updatedComment;
};

const deleteComment = async (id: string) => {
  const isCommentExist = await Comment.findById(id);
  if (!isCommentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "comment doesn't exist");
  }

  return await Comment.findByIdAndDelete(id);
};

export const CommentServices = {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
};
