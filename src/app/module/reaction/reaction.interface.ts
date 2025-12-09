import type { Types } from "mongoose";
import type { ReactType } from "./reaction.contant";
import type { EntityType,  } from "../../constant/constant";



export interface IReact {
  entityId: Types.ObjectId;
  entityType: EntityType;
  user: Types.ObjectId;
  reactType: ReactType;
}

