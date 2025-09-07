import type { JwtPayload } from 'jsonwebtoken';

import type { Types } from 'mongoose';
import { Comment } from './comment.model';
import AppError from '../../errorHelpers/appError';
import { Post } from '../post/post.model';
import type { IComments } from './comment.interface';
import httpStatus from 'http-status-codes';
import type { Role } from '../user/user.constant';


const createComment = async (payload: IComments) => {
  // console.log(payload);
 return await Comment.create(payload);



 
};

const updateComment = async (id: string, payload: Partial<IComments>) => {
  const isCommentExist = await Comment.findById(id);

  if (!isCommentExist) {
    throw new Error('Comment does not exist.');
  }

  const updatedComment = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
  });
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
};
