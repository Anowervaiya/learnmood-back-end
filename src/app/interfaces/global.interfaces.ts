import type { Types } from "mongoose";
import type { MEDIA_TYPE } from "../constant/constant";

export interface IMedia {
  url: string;
  type: MEDIA_TYPE;
}
// export interface IFollowers {
//   user: Types.ObjectId;
// }

export interface IImage {
  profile?: string;
  banner?: string;
}
