import type { JwtPayload } from "jsonwebtoken";
import type { IPost, VISIBILITY } from "./post.interface";
import { Post } from "./post.model";
import type { Types } from "mongoose";
import type { Role } from "../user/user.interfaces";

 interface IPayload {
  userId: string;
  email?: string;
  role?: Role;
  iat?: number;
  exp?: number;
  content: string;
  visibility: VISIBILITY;
}


const createPost = async (payload: IPayload) => {


  const post = await Post.create({
    user: payload.userId,
     ...payload

  })

  return post;

  }




export const PostServices = {
  createPost
}
