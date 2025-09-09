import type { Types } from "mongoose";
import type { EntityType } from "../../constant/constant";
import type { IMedia } from "../../interfaces/global.interfaces";

export interface IComments {
  entityId: Types.ObjectId;
  entityType: EntityType;
  media?: IMedia[];
  user: Types.ObjectId;
  content: string;
}