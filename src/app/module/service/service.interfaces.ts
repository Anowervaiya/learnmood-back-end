import type { Types } from "mongoose";
import type { COURSE_LEVEL, SERVICE_CATEGORY } from "./service.constant";
import type { IMedia } from "../../interfaces/global.interfaces";

export interface IService {
  page: Types.ObjectId; // The ObjectId of the referenced Page
  user: Types.ObjectId; // The ObjectId of the referenced User
  title: string;
  description?: string;
  category: SERVICE_CATEGORY;
  media?: IMedia[];
  price?: number;
  duration?: string;
  level?: COURSE_LEVEL;
  participants?: string[]; // The ObjectIds of the referenced Users
}