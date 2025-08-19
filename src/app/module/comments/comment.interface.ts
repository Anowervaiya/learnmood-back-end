import type { Types } from "mongoose";

export interface IComments{
  post: Types.ObjectId;
  user: Types.ObjectId;
  content: string
}