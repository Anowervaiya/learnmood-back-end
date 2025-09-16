import type { Types } from "mongoose";

export interface IMedia {
  url: string;
  type: 'image' | 'video';
}
// export interface IFollowers {
//   user: Types.ObjectId;
// }

export interface IImage {
  profile?: string;
  banner?: string;
}
