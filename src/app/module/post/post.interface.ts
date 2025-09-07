import type { Types } from 'mongoose';

import type { VISIBILITY } from '../../constant/constant';
import type { IMedia } from '../../interfaces/global.interfaces';



export interface IPost {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  media?: IMedia[];
  tag?: string[];
  visibility: VISIBILITY;
}
