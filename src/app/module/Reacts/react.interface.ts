import type { Types } from 'mongoose';

export interface IReact {
  user: Types.ObjectId; // who reactd
  post: Types.ObjectId; // which post
  createdAt: Date;
}
export interface IReactType {
 type : string
 
}

