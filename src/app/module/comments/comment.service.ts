import type { JwtPayload } from "jsonwebtoken";

import type { Types } from "mongoose";
import type { Role } from "../user/user.interfaces";
import type { VISIBILITY } from "../post/post.interface";
import { Comment } from "./comment.model";
import AppError from "../../errorHelpers/appError";
import { Post } from "../post/post.model";

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
    post : payload.post

  })

  if (!comment) {
    throw new AppError(401, 'some is wrong')
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

  }




export const CommentServices = {
  createComment,
};
