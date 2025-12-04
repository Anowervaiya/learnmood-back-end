import { Schema, model, Types } from 'mongoose';
import type { IReact } from './react.interface';
import { ReactType   } from './react.contant';
import { EntityType } from '../../constant/constant';





const ReactSchema = new Schema<IReact>(
  {
    entityId: { type: Schema.Types.ObjectId, refPath: 'entityType', required: true, index: true },
    entityType: {
      type: String,
      enum: Object.values(EntityType), // Add more entity names if needed
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reactType: {
      type: String,
      enum: Object.values(ReactType),
      default: ReactType.like,
    },
  },
  { timestamps: true }
);


export const React = model<IReact>('React', ReactSchema);
