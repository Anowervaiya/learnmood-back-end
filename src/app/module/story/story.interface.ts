import type { Types } from 'mongoose';
import type { IComments } from '../comments/comment.interface';
import type { IReact } from '../reacts/react.interface';
import type { VISIBILITY } from '../../constant/constant';
import type { IMedia } from '../../interfaces/global.interfaces';



export interface IStory {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  media?: IMedia[];
  tag?: Types.ObjectId[];
  visibility: VISIBILITY;
}
