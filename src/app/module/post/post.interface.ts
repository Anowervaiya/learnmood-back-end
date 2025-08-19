import type { Types } from 'mongoose';
import type { IReact } from '../Reacts/react.interface';
import type { IComments } from '../comments/comment.interface';

export interface IMedia {
  url: string;
  type: 'image' | 'video';
}

export enum VISIBILITY {
  PUBLIC = 'PUBLIC',
  FOLLOWERS = 'FOLLOWERS',
  FRIENDS = 'FRIENDS',
  ONLY_ME = 'ONLY_ME',
}
export interface IPost {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  media?: IMedia[];
  tags?: string[];
  reacts?: IReact[];
  comments?: IComments[];
  visibility: VISIBILITY;
}
