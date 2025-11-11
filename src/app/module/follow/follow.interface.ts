import { Types } from 'mongoose';
import type { FOLLOWER_TYPE } from './follow.constant';

export interface IFollow {
  follower: {
    id: Types.ObjectId;
    type: FOLLOWER_TYPE;
  };
  following: {
    id: Types.ObjectId;
    type: FOLLOWER_TYPE.Page;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
