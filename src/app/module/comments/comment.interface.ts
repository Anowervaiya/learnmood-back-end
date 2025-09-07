import type { Types } from "mongoose";
import type { EntityType } from "../../constant/constant";

export interface IComments {
  entityId: Types.ObjectId;
  entityType: EntityType;
  user: Types.ObjectId;
  content: string;
}