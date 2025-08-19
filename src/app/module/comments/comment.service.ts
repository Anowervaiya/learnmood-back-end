import type { JwtPayload } from 'jsonwebtoken';

import type { Types } from 'mongoose';
import type { Role } from '../user/user.interfaces';
import type { VISIBILITY } from '../post/post.interface';
import { Comment } from './comment.model';
import AppError from '../../errorHelpers/appError';
import { Post } from '../post/post.model';
import type { IComments } from './comment.interface';
import httpStatus from 'http-status-codes'
interface IPayload {
  userId: Types.ObjectId;
  post: Types.ObjectId;
  email?: string;
  role?: Role;
  iat?: number;
  exp?: number;
  content: string;
}

const createComment = async (payload: IPayload) => {
  const comment = await Comment.create({
    user: payload.userId,
    content: payload.content,
    post: payload.post,
  });
  if (!comment) {
    throw new AppError(401, 'some is wrong');
  }

  await Post.findByIdAndUpdate(
    comment.post,
    {
      $push: {
        comments: comment._id,
      },
    },
    { new: true }
  );

  return comment;
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
