import type { Types } from 'mongoose';

import type { ACCOUNT_TYPE, VISIBILITY } from '../../constant/constant';
import type { IMedia } from '../../interfaces/global.interfaces';
import type { ReactType } from '../reaction/reaction.contant';



export interface IPost {
  _id?: Types.ObjectId;
  accountId: Types.ObjectId;
  accountType: ACCOUNT_TYPE;
  content: string;
  media?: IMedia[];
  tag?: string[];
  reactions?: Record<ReactType, number>; 
  commentCount?: number;
  shareCount?: number;
  visibility: VISIBILITY;
  createdAt?: Date;
  updatedAt?: Date;
}
