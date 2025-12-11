import type { Types } from "mongoose";
import type { ReactType } from "./reaction.contant";
import type { ACCOUNT_TYPE, EntityType,  } from "../../constant/constant";



export interface IReact {
  entityId: Types.ObjectId;
  entityType: EntityType;
  accountId: Types.ObjectId;
  accountType: ACCOUNT_TYPE;
  reactType: ReactType;
}

