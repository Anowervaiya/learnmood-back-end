import { Schema, model, Types } from 'mongoose';
import type { IReact } from './reaction.interface';
import { ReactType } from './reaction.contant';
import { ACCOUNT_TYPE, EntityType } from '../../constant/constant';





const ReactSchema = new Schema<IReact>(
  {
    entityId: { type: Schema.Types.ObjectId, refPath: 'entityType', required: true, index: true },
    entityType: {
      type: String,
      enum: Object.values(EntityType), // Add more entity names if needed
      required: true,
    },

    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'accountType'
    },
    accountType: {
      type: String,
      enum: Object.values(ACCOUNT_TYPE),
      required: true
    }, 
    reactType: {
      type: String,
      enum: Object.values(ReactType),
      default: ReactType.like,
    },
  },
  { timestamps: true }
);


export const React = model<IReact>('React', ReactSchema);
