import type { Types } from "mongoose";
import type { IMedia } from "../../interfaces/global.interfaces";

export interface IMessages {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  media?: IMedia[];
  content: string;
}