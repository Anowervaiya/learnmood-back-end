import type { Types } from "mongoose";
import type { EntityType } from "../../constant/constant";

export interface IParticipant {
  entityId: Types.ObjectId;
  entityType: EntityType;
  user: Types.ObjectId;
  joinedAt?: Date;
  progress?: number; // % completion or streak count
  completed?: boolean;
}
