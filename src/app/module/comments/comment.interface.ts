import type { Types } from "mongoose";
import type { ACCOUNT_TYPE, EntityType } from "../../constant/constant";
import type { IMedia } from "../../interfaces/global.interfaces";

export interface IComments {
  entityId: Types.ObjectId;
  entityType: EntityType;
  media?: IMedia[];
  accountId: Types.ObjectId;
  accountType: ACCOUNT_TYPE;
  content: string;
}